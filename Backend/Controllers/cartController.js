import User from "../Model/User.js";

// Get Cart
export const getCart = async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.productId");
  res.json(user.cart);
};

// Add to Cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await User.findById(req.user._id);
  const existingItem = user.cart.find((item) => item.productId.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ productId, quantity });
  }
  await user.save();
  res.json(user.cart);
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter((item) => item.productId.toString() !== productId);
  await user.save();
  res.json(user.cart);
};
