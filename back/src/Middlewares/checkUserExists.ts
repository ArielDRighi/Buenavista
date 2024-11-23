import { Request, Response, NextFunction } from "express";
import { getUserByIdService } from "../services/userService";

// Middleware para verificar si el usuario existe
export const checkUserExists = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;

  // Verificar si el userId está presente en la solicitud
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Verificar si el usuario existe
    const user = await getUserByIdService(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Si el usuario existe, pasar al siguiente middleware/controlador
    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
