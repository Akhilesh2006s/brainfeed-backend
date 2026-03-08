const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const User = require("./models/User.cjs");
const Admin = require("./models/Admin.cjs");
const Post = require("./models/Post.cjs");
const Page = require("./models/Page.cjs");

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "brainfeed-jwt-secret-change-in-production";
const isProduction = process.env.NODE_ENV === "production";
const DATA_DIR = path.join(__dirname, "data");
const ARTICLES_PATH = path.join(DATA_DIR, "articles.json");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const imageFilter = (req, file, cb) => {
  const allowed = /^image\/(jpeg|jpg|png|gif|webp)$/;
  if (allowed.test(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};
const mediaFilter = (req, file, cb) => {
  const allowed = /^image\/(jpeg|jpg|png|gif|webp)|^audio\/|^video\//;
  if (allowed.test(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid media type"), false);
};
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: imageFilter,
});
const uploadPostMedia = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: mediaFilter,
});

function readArticles() {
  try {
    const raw = fs.readFileSync(ARTICLES_PATH, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    if (e.code === "ENOENT") return [];
    throw e;
  }
}

function writeArticles(articles) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (_) {}
  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2), "utf8");
}

const app = express();

// Trust first proxy (Railway, Vercel, etc.) so X-Forwarded-* and client IP are correct
app.set("trust proxy", 1);

// ----- CORS (use cors package so preflight is always correct on Railway) -----
const DEFAULT_ORIGINS = [
  "https://brainfeed-frontend.vercel.app",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:8080",
];
const allowedOrigins = [...DEFAULT_ORIGINS];
const envOrigins = (process.env.CORS_ORIGIN || process.env.FRONTEND_URL || "").trim();
if (envOrigins) {
  envOrigins.split(",").forEach((o) => {
    const s = o.trim();
    if (s && !allowedOrigins.includes(s)) allowedOrigins.push(s);
  });
}

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const value = (origin && allowedOrigins.includes(origin)) ? origin : allowedOrigins[0];
  res.setHeader("Access-Control-Allow-Origin", value);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Vary", "Origin");
}

app.use(express.json());

const mongoUri = (process.env.MONGO_URI || "").trim();

// Root – so deployed URL works for quick checks (CORS applied by middleware)
app.get("/", (req, res) => {
  res.json({ ok: true, api: "Brainfeed API", health: "/api/health" });
});

// Health check: MongoDB reachable + Cloudinary config (no auth required). Never throws 500.
app.get("/api/health", async (req, res) => {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "";
    const cloudinaryConfigured = Boolean(
      cloudName &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    );
    let mongoStatus = "not connected";
    let databaseName = null;
    if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
      try {
        await mongoose.connection.db.admin().ping();
        mongoStatus = "connected";
        databaseName = mongoose.connection.db.databaseName || "Brainfeed";
      } catch (e) {
        mongoStatus = "ping failed";
      }
    }
    const ok = mongoStatus === "connected" && cloudinaryConfigured;
    res.json({
      ok,
      mongo: mongoStatus,
      cloudinary: cloudinaryConfigured ? "configured" : "missing env vars",
      database: databaseName,
    });
  } catch (e) {
    console.error("Health check error:", e);
    res.status(500).json({ ok: false, mongo: "error", cloudinary: "unknown", error: e.message });
  }
});

function startServer() {
  const host = process.env.HOST || "0.0.0.0";
  app.listen(PORT, host, () => {
    console.log(`Brainfeed API running on http://${host}:${PORT}`);
    if (isProduction && (!process.env.JWT_SECRET || process.env.JWT_SECRET === "brainfeed-jwt-secret-change-in-production")) {
      console.warn("WARNING: Set JWT_SECRET in production (e.g. on Railway) for secure tokens.");
    }
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.warn("Admin login: ADMIN_EMAIL or ADMIN_PASSWORD not set in .env – admin login may fail.");
    } else {
      console.log("Admin login: credentials loaded from .env");
    }
  });
}

// Start server immediately so Railway gets a response (required for "Application failed to respond")
startServer();

// MongoDB: connect in background so app stays up even if DB is slow or temporarily down
const mongooseOptions = {
  serverSelectionTimeoutMS: 10000,
  maxPoolSize: 10,
  retryWrites: true,
};

if (mongoUri) {
  mongoose.connect(mongoUri, mongooseOptions)
    .then((conn) => {
      const dbName = conn.connection?.db?.databaseName || "Brainfeed";
      console.log("MongoDB connected to database:", dbName);
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      console.error("Check MONGO_URI in Railway env and network. API will respond but auth/posts will fail until connected.");
    });
} else {
  console.warn("MONGO_URI is not set in .env – admin/login and posts will not work.");
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Authentication required" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

function adminAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Admin authentication required" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.adminId) return res.status(403).json({ error: "Not an admin" });
    req.adminId = decoded.adminId;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

async function uploadToCloudinary(buffer, mimeType, folder) {
  const dataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(dataUri, { folder }, (err, res) => (err ? reject(err) : resolve(res)));
  });
}

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, howDidYouHear, wantsUpdates } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedName = String(name).trim();
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    const existing = await User.findOne({ email: trimmedEmail });
    if (existing) return res.status(409).json({ error: "An account with this email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      howDidYouHear: howDidYouHear ? String(howDidYouHear).trim() : "",
      wantsUpdates: wantsUpdates !== false,
    });
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ user: user.toJSON(), token });
  } catch (e) {
    res.status(500).json({ error: e.message || "Sign up failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: "Database not connected. Check MONGO_URI and try again." });
    }
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email: String(email).trim().toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid email or password" });
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: user.toJSON(), token });
  } catch (e) {
    console.error("Auth login error:", e);
    res.status(500).json({ error: e.message || "Login failed" });
  }
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to get user" });
  }
});

app.patch("/api/auth/profile", authMiddleware, async (req, res) => {
  try {
    const { name, howDidYouHear, wantsUpdates } = req.body || {};
    const update = {};
    if (name !== undefined) update.name = String(name).trim();
    if (howDidYouHear !== undefined) update.howDidYouHear = String(howDidYouHear).trim();
    if (wantsUpdates !== undefined) update.wantsUpdates = wantsUpdates !== false;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: update },
      { new: true, runValidators: true }
    ).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to update profile" });
  }
});

// ----- Admin auth -----
app.post("/api/admin/login", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: "Database not connected. Check MONGO_URI and try again." });
    }
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const adminEmail = String(email).trim().toLowerCase();
    const passwordTrimmed = String(password).trim();
    const adminEnvEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const adminEnvPassword = (process.env.ADMIN_PASSWORD || "").trim();

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      if (adminEnvEmail && adminEnvPassword && adminEnvEmail === adminEmail) {
        const hashed = await bcrypt.hash(adminEnvPassword, 10);
        admin = await Admin.create({ email: adminEnvEmail, password: hashed });
      } else {
        return res.status(401).json({ error: "Invalid email or password" });
      }
    }
    let match = await bcrypt.compare(passwordTrimmed, admin.password);
    if (!match && adminEnvPassword && adminEnvEmail === adminEmail && passwordTrimmed === adminEnvPassword) {
      admin.password = await bcrypt.hash(adminEnvPassword, 10);
      await admin.save();
      match = true;
    }
    if (!match) return res.status(401).json({ error: "Invalid email or password" });
    const token = jwt.sign({ adminId: admin._id.toString() }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ admin: admin.toJSON(), token });
  } catch (e) {
    console.error("Admin login error:", e);
    res.status(500).json({ error: e.message || "Login failed" });
  }
});

app.get("/api/admin/me", adminAuthMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to get admin" });
  }
});

// ----- Admin backup (MongoDB + Cloudinary URL list; works for Atlas and self-hosted) -----
function collectCloudinaryUrls(posts) {
  const seen = new Set();
  const urls = [];
  for (const post of posts || []) {
    if (post.featuredImageUrl && !seen.has(post.featuredImageUrl)) {
      seen.add(post.featuredImageUrl);
      urls.push({ url: post.featuredImageUrl, type: "featured" });
    }
    const gallery = post.media?.gallery || [];
    for (const u of gallery) {
      if (u && !seen.has(u)) {
        seen.add(u);
        urls.push({ url: u, type: "gallery" });
      }
    }
    if (post.media?.videoUrl && post.media.videoUrl.startsWith("http")) {
      if (!seen.has(post.media.videoUrl)) {
        seen.add(post.media.videoUrl);
        urls.push({ url: post.media.videoUrl, type: "video" });
      }
    }
    if (post.media?.audioUrl && post.media.audioUrl.startsWith("http")) {
      if (!seen.has(post.media.audioUrl)) {
        seen.add(post.media.audioUrl);
        urls.push({ url: post.media.audioUrl, type: "audio" });
      }
    }
  }
  return urls;
}

app.get("/api/admin/backup", adminAuthMiddleware, async (req, res) => {
  try {
    const [users, admins, posts, pages] = await Promise.all([
      User.find().lean(),
      Admin.find().lean(),
      Post.find().lean(),
      Page.find().lean(),
    ]);
    const dbName = mongoose.connection.db?.databaseName || "Brainfeed";
    const cloudinaryUrls = collectCloudinaryUrls(posts);
    const backup = {
      backupAt: new Date().toISOString(),
      database: dbName,
      users,
      admins,
      posts,
      pages,
      cloudinaryUrls,
    };
    if (req.query.download === "1" || req.query.download === "true") {
      res.setHeader("Content-Disposition", `attachment; filename="brainfeed-backup-${Date.now()}.json"`);
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(backup, null, 2));
      return;
    }
    res.json(backup);
  } catch (e) {
    res.status(500).json({ error: e.message || "Backup failed" });
  }
});

// (gallery APIs were removed)

// ----- Admin posts CRUD -----
const postMediaFields = [
  { name: "featuredImage", maxCount: 1 },
  { name: "gallery", maxCount: 20 },
  { name: "videoFile", maxCount: 1 },
  { name: "audioFile", maxCount: 1 },
];

app.get("/api/admin/posts", adminAuthMiddleware, async (req, res) => {
  try {
    const type = req.query.type;
    const filter = type ? { type } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();
    res.json(posts);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to load posts" });
  }
});

app.post("/api/admin/posts", adminAuthMiddleware, uploadPostMedia.fields(postMediaFields), async (req, res) => {
  try {
    const body = req.body || {};
    const type = body.type === "blog" ? "blog" : "news";
    const title = String(body.title || "").trim();
    const category = String(body.category || "").trim();
    if (!title || !category) {
      return res.status(400).json({ error: "Title and category are required" });
    }
    const folder = type === "news" ? "brainfeed-news" : "brainfeed-blog";
    let featuredImageUrl = "";
    if (req.files?.featuredImage?.[0]) {
      const r = await uploadToCloudinary(
        req.files.featuredImage[0].buffer,
        req.files.featuredImage[0].mimetype,
        folder
      );
      featuredImageUrl = r.secure_url;
    }
    const galleryUrls = [];
    if (req.files?.gallery?.length) {
      for (const file of req.files.gallery) {
        const r = await uploadToCloudinary(file.buffer, file.mimetype, folder);
        galleryUrls.push(r.secure_url);
      }
    }
    let videoUrl = String(body.videoUrl || "").trim();
    if (req.files?.videoFile?.[0]) {
      const r = await uploadToCloudinary(
        req.files.videoFile[0].buffer,
        req.files.videoFile[0].mimetype,
        folder
      );
      videoUrl = r.secure_url;
    }
    let audioUrl = String(body.audioUrl || "").trim();
    if (req.files?.audioFile?.[0]) {
      const r = await uploadToCloudinary(
        req.files.audioFile[0].buffer,
        req.files.audioFile[0].mimetype,
        folder
      );
      audioUrl = r.secure_url;
    }
    const post = await Post.create({
      type,
      title,
      subtitle: String(body.subtitle || "").trim(),
      content: String(body.content || "").trim(),
      format: ["standard", "gallery", "video", "audio", "link", "quote"].includes(body.format) ? body.format : "standard",
      category,
      excerpt: String(body.excerpt || "").trim(),
      readTime: String(body.readTime || "4 min read").trim(),
      featuredImageUrl,
      media: {
        gallery: galleryUrls,
        videoUrl,
        audioUrl,
        linkUrl: String(body.linkUrl || "").trim(),
        quoteText: String(body.quoteText || "").trim(),
      },
    });
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to create post" });
  }
});

app.patch("/api/admin/posts/:id", adminAuthMiddleware, uploadPostMedia.fields(postMediaFields), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const body = req.body || {};
    const folder = post.type === "news" ? "brainfeed-news" : "brainfeed-blog";
    if (body.title !== undefined) post.title = String(body.title).trim();
    if (body.subtitle !== undefined) post.subtitle = String(body.subtitle).trim();
    if (body.content !== undefined) post.content = String(body.content).trim();
    if (body.format !== undefined && ["standard", "gallery", "video", "audio", "link", "quote"].includes(body.format)) post.format = body.format;
    if (body.category !== undefined) post.category = String(body.category).trim();
    if (body.excerpt !== undefined) post.excerpt = String(body.excerpt).trim();
    if (body.readTime !== undefined) post.readTime = String(body.readTime).trim();
    if (body.videoUrl !== undefined) post.media.videoUrl = String(body.videoUrl).trim();
    if (body.audioUrl !== undefined) post.media.audioUrl = String(body.audioUrl).trim();
    if (body.linkUrl !== undefined) post.media.linkUrl = String(body.linkUrl).trim();
    if (body.quoteText !== undefined) post.media.quoteText = String(body.quoteText).trim();
    if (req.files?.featuredImage?.[0]) {
      const r = await uploadToCloudinary(req.files.featuredImage[0].buffer, req.files.featuredImage[0].mimetype, folder);
      post.featuredImageUrl = r.secure_url;
    }
    if (req.files?.gallery?.length) {
      const newUrls = [];
      for (const file of req.files.gallery) {
        const r = await uploadToCloudinary(file.buffer, file.mimetype, folder);
        newUrls.push(r.secure_url);
      }
      post.media.gallery = post.media.gallery.concat(newUrls);
    }
    if (body.galleryRemove === "true" || body.clearGallery === "true") post.media.gallery = [];
    await post.save();
    res.json(post);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to update post" });
  }
});

app.get("/api/admin/posts/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to load post" });
  }
});

app.delete("/api/admin/posts/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json({ deleted: true });
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to delete post" });
  }
});

// ----- Admin pages CRUD (WordPress-style static pages) -----
function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "page";
}

app.get("/api/admin/pages", adminAuthMiddleware, async (req, res) => {
  try {
    const pages = await Page.find().sort({ order: 1, title: 1 }).lean();
    res.json(pages);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to load pages" });
  }
});

app.post("/api/admin/pages", adminAuthMiddleware, async (req, res) => {
  try {
    const body = req.body || {};
    const title = String(body.title || "").trim();
    if (!title) return res.status(400).json({ error: "Title is required" });
    let slug = String(body.slug || "").trim() || slugify(title);
    slug = slugify(slug) || "page";
    const existing = await Page.findOne({ slug });
    if (existing) {
      let suffix = 1;
      while (await Page.findOne({ slug: slug + "-" + suffix })) suffix++;
      slug = slug + "-" + suffix;
    }
    const parentId = body.parent ? body.parent : null;
    const order = Number(body.order) ?? 0;
    const page = await Page.create({
      title,
      slug,
      content: String(body.content || "").trim(),
      parent: parentId || null,
      order,
    });
    res.status(201).json(page);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to create page" });
  }
});

app.get("/api/admin/pages/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id).lean();
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json(page);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to load page" });
  }
});

app.patch("/api/admin/pages/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ error: "Page not found" });
    const body = req.body || {};
    if (body.title !== undefined) page.title = String(body.title).trim();
    if (body.slug !== undefined) {
      const raw = String(body.slug).trim();
      page.slug = raw ? slugify(raw) : slugify(page.title);
    }
    if (body.content !== undefined) page.content = String(body.content).trim();
    if (body.parent !== undefined) page.parent = body.parent || null;
    if (body.order !== undefined) page.order = Number(body.order) ?? 0;
    await page.save();
    res.json(page);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to update page" });
  }
});

app.delete("/api/admin/pages/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json({ deleted: true });
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to delete page" });
  }
});

// ----- Public pages (by slug for menus and single page view) -----
app.get("/api/pages", async (req, res) => {
  try {
    const pages = await Page.find().sort({ order: 1, title: 1 }).select("title slug parent order").lean();
    res.json(pages);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to load pages" });
  }
});

app.get("/api/pages/slug/:slug", async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug }).lean();
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json(page);
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to load page" });
  }
});

// ----- Public posts (News & Blog) -----
app.get("/api/posts/news", async (req, res) => {
  try {
    const posts = await Post.find({ type: "news" }).sort({ createdAt: -1 }).lean();
    res.json(posts.map((p) => ({ ...p, id: p._id.toString(), imageUrl: p.featuredImageUrl })));
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to load news" });
  }
});

app.get("/api/posts/blogs", async (req, res) => {
  try {
    const posts = await Post.find({ type: "blog" }).sort({ createdAt: -1 }).lean();
    res.json(posts.map((p) => ({ ...p, id: p._id.toString(), imageUrl: p.featuredImageUrl })));
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to load blogs" });
  }
});

app.get("/api/posts/news/:id", async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, type: "news" },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();
    if (!post) return res.status(404).json({ error: "Not found" });
    res.json({ ...post, id: post._id.toString(), imageUrl: post.featuredImageUrl });
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to load article" });
  }
});

app.get("/api/posts/blogs/:id", async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, type: "blog" },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();
    if (!post) return res.status(404).json({ error: "Not found" });
    res.json({ ...post, id: post._id.toString(), imageUrl: post.featuredImageUrl });
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to load post" });
  }
});

app.get("/api/articles", async (req, res) => {
  try {
    const posts = await Post.find({ type: "news" }).sort({ createdAt: -1 }).lean();
    res.json(
      posts.map((p) => ({
        id: p._id.toString(),
        imageUrl: p.featuredImageUrl,
        title: p.title,
        excerpt: p.excerpt || p.subtitle || "",
        date: p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "",
        category: p.category,
        readTime: p.readTime || "4 min read",
      }))
    );
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to load articles" });
  }
});

// 404 – set CORS so cross-origin clients get a valid response
app.use((req, res) => {
  setCorsHeaders(req, res);
  res.status(404).json({ error: "Not found" });
});

// Global error handler – always send valid CORS so browser does not block
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  setCorsHeaders(req, res);
  if (!res.headersSent) {
    res.status(500).json({ error: err.message || "Internal server error" });
  } else {
    next(err);
  }
});
