const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["pre-primary", "library", "classroom", "magazine"],
      required: true,
    },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true, default: "" },
    badge: { type: String, trim: true, default: "" }, // e.g. "-20%"
    tag: { type: String, trim: true, default: "" }, // e.g. "Pre Primary Packs"
    /** Homepage "Latest Magazines" card: Volume · Issue · Month line (magazine category only). */
    magazineEditionLine: { type: String, trim: true, default: "" },
    /**
     * Which home "Latest Magazines" card this product fills (main, junior, …). When set, overrides name/slug matching.
     */
    homepageMagazineSlot: { type: String, trim: true, default: "" },
    oldPrice: { type: Number, default: 0 }, // in rupees
    price: { type: Number, required: true }, // in rupees
    currency: { type: String, default: "INR" },
    imageUrl: { type: String, trim: true, default: "" },
    /** Extra product photos (e.g. feature callouts), max 4 — shown as thumbnails on product page */
    galleryImageUrls: {
      type: [String],
      default: [],
      validate: {
        validator: (v) => !Array.isArray(v) || v.length <= 4,
        message: "At most 4 gallery images allowed",
      },
    },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model("Product", productSchema);

