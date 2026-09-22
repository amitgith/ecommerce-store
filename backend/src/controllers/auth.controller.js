export const apiController = (req, res) => {
  try {
    console.log("Welcome to Ecommerce-store Api");
    res.status(200).json({
      message: "Welcome to Ecommerce-store Api",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};
