import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens, verifyRefreshToken } from "../utils/auth.utils.js";
export const registerApiController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({
      email,
    });
    if (isUserAlreadyExists) {
      return res.status(409).json({
        message: "user already exists with this email address",
        errors: [
          {
            path: "email",
            message: "user already exists with this email address",
          },
        ],
      });
    }
    const user = await userModel.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
    });
    res.status(201).json({
      message: "user registered successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const loginApiController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const { accessToken, refreshToken } = generateTokens({
      userId: user._id,
    });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({
      user: "User logged in  successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const refreshTokenApiController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is required",
    });
  }
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const { userId, role } = decoded;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    if (refreshToken !== user.refreshToken) {
      console.log("TOKEN MISMATCH");
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });
      return res.status(401).json({
        message: "Refresh Token mismatch",
      });
    }
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId,
    });
    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({
      message: "Tokens rotated successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.log("REFRESH ERROR:", error.message);
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};
export const logoutApiController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      await userModel.findOneAndUpdate(
        { refreshToken },
        { refreshToken: null },
      );
    }
    res.clearCookie("refreshToken");
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const aboutMeApiController = async (req, res) => {
  const { userId } = req.user;
  const user = await userModel.findById(userId);
  res.status(200).json({
    message: "User data fetch successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    },
  });
};
