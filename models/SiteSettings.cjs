const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    homeHero: {
      eyebrow: { type: String, trim: true, default: "" },
      title: { type: String, trim: true, default: "" },
      titleAccent: { type: String, trim: true, default: "" },
      subtitle1: { type: String, trim: true, default: "" },
      subtitle2: { type: String, trim: true, default: "" },
      backgroundImageUrl: { type: String, trim: true, default: "" },
    },
    topBar: {
      links: [
        {
          label: { type: String, trim: true, default: "" },
          url: { type: String, trim: true, default: "" },
        },
      ],
      social: {
        facebook: { type: String, trim: true, default: "" },
        twitter: { type: String, trim: true, default: "" },
        instagram: { type: String, trim: true, default: "" },
        linkedin: { type: String, trim: true, default: "" },
        youtube: { type: String, trim: true, default: "" },
        email: { type: String, trim: true, default: "" },
      },
    },
    footer: {
      description: { type: String, trim: true, default: "" },
      email: { type: String, trim: true, default: "" },
      social: {
        facebook: { type: String, trim: true, default: "" },
        twitter: { type: String, trim: true, default: "" },
        instagram: { type: String, trim: true, default: "" },
        linkedin: { type: String, trim: true, default: "" },
        youtube: { type: String, trim: true, default: "" },
        email: { type: String, trim: true, default: "" },
      },
    },
    contact: {
      addressLines: [{ type: String, trim: true }],
      whatsapp: { type: String, trim: true, default: "" },
      emails: [{ type: String, trim: true }],
      regionTitle: { type: String, trim: true, default: "" },
      regionName: { type: String, trim: true, default: "" },
      regionWhatsapp: { type: String, trim: true, default: "" },
      regionEmail: { type: String, trim: true, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);

