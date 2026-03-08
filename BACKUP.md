# Database and Cloudinary backup – Brainfeed backend

The app uses **MongoDB** and **Cloudinary** (images/media). Back up both: **app backup** (DB + list of Cloudinary URLs), **native DB backup** (Atlas or mongodump), and **Cloudinary** (see Section 3).

---

## 1. Check that the database is healthy

Before backing up, confirm the DB is reachable:

- **API:** `GET /api/health`
- **Expected when good:** `{ "ok": true, "mongo": "connected", "database": "Brainfeed" }`

If `mongo` is not `"connected"`, fix `MONGO_URI` and network first.

---

## 2. App backup (works for cloud and self-hosted)

The backend exposes an **admin-only** backup endpoint that exports all data as JSON. Use this for **MongoDB Atlas (cloud)** or any other MongoDB.

### How to use

1. Log in as admin (get a token from `POST /api/admin/login`).
2. Call the backup endpoint with the token:

```bash
# Get JSON in response (e.g. for scripts)
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  "https://your-backend.up.railway.app/api/admin/backup"

# Download as file (save to cloud or local)
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  "https://your-backend.up.railway.app/api/admin/backup?download=1" \
  -o brainfeed-backup-$(date +%Y%m%d).json
```

3. **Store the file** in your cloud (Google Drive, OneDrive, S3, etc.) or local disk.

### What is included

| Key             | Contents |
|-----------------|----------|
| `backupAt`      | ISO timestamp of backup |
| `database`      | DB name |
| `users`         | User accounts |
| `admins`        | Admin accounts (hashed passwords) |
| `posts`         | News and blog posts |
| `pages`         | Static pages |
| `cloudinaryUrls`| List of all Cloudinary asset URLs used in posts (featured, gallery, video, audio) – for Cloudinary backup (see Section 3) |

### Backup for cloud (Atlas)

- Use the **app backup** above on a schedule (e.g. cron job or scheduled task that calls `/api/admin/backup?download=1` and uploads the file to S3/Drive).
- This gives you a second copy in addition to Atlas’s own backups.

### Restore from app backup JSON

To restore from a `brainfeed-backup-*.json` file you need to re-insert the data into MongoDB (e.g. a small script using `mongoose` or `mongo` shell that reads the JSON and inserts into `users`, `admins`, `posts`, `pages`). The backend does not provide a restore endpoint for security; restore via script or Atlas restore from a snapshot.

---

## 3. Cloudinary (media) backup

Images and media are stored on **Cloudinary**. Back them up too.

### What the app backup gives you

- The **app backup JSON** (Section 2) includes a **`cloudinaryUrls`** array: every Cloudinary URL referenced in your posts (featured images, gallery, video, audio). Save the backup file so you have a full list of assets even if Cloudinary is lost.

### Backing up Cloudinary itself

1. **Cloudinary Dashboard**
   - Log in at [cloudinary.com](https://cloudinary.com) → **Media Library**.
   - Use **Bulk** or **Export** if your plan supports it to download assets or get a manifest.

2. **Download assets using the backup list**
   - After you run app backup, use the `cloudinaryUrls` array and download each URL to your own storage (script or tool). That way you have a copy of every image/video/audio the app uses.

3. **Cloudinary backup/export**
   - Check Cloudinary’s current docs for **Backup** or **Export** (some plans offer automated backup or export). Ensure your plan has backup if you rely on it.

**Recommendation:** Run app backup regularly and store the JSON (including `cloudinaryUrls`) in cloud storage. Optionally script downloads of the URLs in `cloudinaryUrls` to your own bucket or disk so Cloudinary media is backed up too.

---

## 4. MongoDB Atlas – native backup (cloud)

If you use **MongoDB Atlas**:

1. **Continuous backup**
   - Atlas UI: **Cluster** → **Backup** (or **Advanced** → **Backup**).
   - Enable **Continuous Backup** / **Cloud Backup**. Atlas keeps point-in-time backups.

2. **Snapshots**
   - Use **Restore** / **Snapshot** to create or restore from a snapshot.

3. **Verify**
   - In Atlas: **Backup** tab → confirm recent snapshots or continuous backup is enabled.

**Recommendation:** Use both Atlas native backup **and** the app backup (Section 2) so you have backups in the cloud even if one method fails.

---

## 5. Self-hosted MongoDB – mongodump

Collections used by this app: `users`, `admins`, `posts`, `pages`.

### One-time backup

```bash
# Replace <MONGO_URI> with your connection string (same as in .env)
mongodump --uri="<MONGO_URI>" --out=./backup-$(date +%Y%m%d)
```

Example (local):

```bash
mongodump --uri="mongodb://localhost:27017/Brainfeed" --out=./backup-$(date +%Y%m%d)
```

### Restore

```bash
mongorestore --uri="<MONGO_URI>" --drop ./backup-YYYYMMDD
```

Use `--drop` only when you intend to replace current data.

### Automated backup (cron)

Run `mongodump` on a schedule and copy the output to safe storage (another disk, S3, etc.). You can **also** use the app backup endpoint (Section 2) to get a JSON copy.

---

## 6. Summary checklist

- [ ] **Health:** `GET /api/health` returns `mongo: "connected"` and Cloudinary is configured.
- [ ] **App backup:** You call `/api/admin/backup?download=1` (with admin token) and store the JSON in cloud or local (includes DB + `cloudinaryUrls`).
- [ ] **Cloudinary:** Backup JSON is stored (so you have the list of all Cloudinary URLs); optionally download those assets to your own storage; check Cloudinary dashboard/plan for backup or export.
- [ ] **Cloud (Atlas):** Atlas Continuous Backup / Cloud Backup is enabled **and** you run app backup and store the file in cloud.
- [ ] **Self-hosted:** `mongodump` (and optionally app backup) runs on a schedule; dumps are copied to safe storage.
- [ ] **Restore tested:** You have restored from at least one backup to confirm it works.

When these are done, both the database and Cloudinary (media) have backup properly set up.
