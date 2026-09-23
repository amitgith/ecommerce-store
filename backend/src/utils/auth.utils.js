import config from "../config/config.js";
import jwt from "jsonwebtoken";
export const generateTokens = ({ userId, role }) => {
  const accessToken = jwt.sign({ userId, role }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId, role }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};
export const verifyAccessToken = (accessToken) => {
  const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
  return decoded;
};
export const verifyRefreshToken = (refreshToken) => {
  const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
  return decoded;
};
