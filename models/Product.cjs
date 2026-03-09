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
    oldPrice: { type: Number, default: 0 }, // in rupees
    price: { type: Number, required: true }, // in rupees
    currency: { type: String, default: "INR" },
    imageUrl: { type: String, trim: true, default: "" },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model("Product", productSchema);

