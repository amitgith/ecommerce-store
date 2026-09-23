import { verifyAccessToken } from "../utils/auth.utils.js";

export const authenticate = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({
      message: "Access token not found in the request header",
    });
  }
  try {
    const decoded = verifyAccessToken(accessToken);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      message: "Invalid or expired access token",
    });
  }
};
