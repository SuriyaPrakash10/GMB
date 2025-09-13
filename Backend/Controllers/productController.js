// controllers/productController.js
import Product from "../Model/Product.js";
import Category from "../Model/Category.js";

// GET /api/products/home
export const getHome = async (req, res) => {
  try {
    const [featured, topRated, categories] = await Promise.all([
      Product.find({ featured: true })
        .sort({ createdAt: -1 })
        .limit(8)
        .select("name price image rating category")
        .lean(),
      Product.find({ topRated: true })
        .sort({ rating: -1 })
        .limit(8)
        .select("name price image rating category")
        .lean(),
      Category.find({})
        .sort({ name: 1 })
        .limit(8)
        .select("name image")
        .lean(),
    ]);

    // small cache to speed up subsequent requests
    res.set("Cache-Control", "public, max-age=120");
    res.json({ featured, topRated, categories });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch home data", error: err.message });
  }
};

// GET /api/products/search?q=...&category=...
export const searchProducts = async (req, res) => {
  try {
    const { q, category } = req.query;
    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (category) filter.category = category;

    const items = await Product.find(filter)
      .sort({ createdAt: -1 })
      .select("name price image rating category")
      .lean();

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};
