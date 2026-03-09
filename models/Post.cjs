const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["news", "blog"] },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true, default: "" },
    content: { type: String, default: "" },
    format: {
      type: String,
      enum: ["standard", "gallery", "video", "audio", "link", "quote"],
      default: "standard",
    },
    featuredImageUrl: { type: String, default: "" },
    media: {
      gallery: [{ type: String }],
      videoUrl: { type: String },
      audioUrl: { type: String },
      linkUrl: { type: String },
      quoteText: { type: String },
    },
    category: { type: String, required: true, trim: true },
    featuredImageAlt: { type: String, trim: true, default: "" },
    excerpt: { type: String, trim: true, default: "" },
    readTime: { type: String, trim: true, default: "4 min read" },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

postSchema.index({ type: 1, createdAt: -1 });

module.exports = mongoose.model("Post", postSchema);
