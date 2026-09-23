import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/auth.utils.js";
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
    const userResponse = user.toObject();
    delete userResponse.passwordHash;
    const { accessToken, refreshToken } = generateTokens({
      userId: user._id,
      role: user.role,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    await userModel.findByIdAndUpdate(user._id, {
      refreshToken,
    });
    res.status(201).json({
      message: "user registered successfully",
      data: {
        user: userResponse,
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
      role: user.role,
    });

    await userModel.findOneAndUpdate(
      { email },
      {
        refreshToken,
      },
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    res.status(200).json({
      user: "User loggedIn successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
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
export const refreshTokenApiController = async (req, res) => {
  
};
