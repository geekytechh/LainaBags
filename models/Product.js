import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "user" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  image: { type: Array, required: true }, // Default/first variant images
  category: { type: String, required: true },
  subsection: { type: String, default: "" },
  colors: { type: Array, default: [] }, // Keep for backward compatibility
  colorVariants: {
    type: Array,
    default: [],
    // Structure: [{ color: "Red", images: ["url1", "url2"] }, { color: "Blue", images: [...] }]
  },
  isBestseller: { type: Boolean, default: false }, // Mark as bestseller
  whatsappNumber: { type: String, required: true },
  date: { type: Date, required: true },
});

const Product =
  mongoose.models.product || mongoose.model("product", productSchema);

export default Product;
