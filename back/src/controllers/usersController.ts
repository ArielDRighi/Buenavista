import { Request, Response } from "express";
import { getAllUsersService, getUserByIdService, createUserService } from "../services/userService";
import IUserDto from "../dto/UserDto";
import { checkCredentials } from "../services/credentialService";
import { getUserByUsernameService } from "../services/userService";

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await getAllUsersService();
    return users.length ? res.status(200).json(users) : res.status(404).json({ error: "No users found" });
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await getUserByIdService(parseInt(req.params.id));
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

// Registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userData: IUserDto = req.body;
    if (
      !userData.name ||
      !userData.email ||
      !userData.birthdate ||
      !userData.nDni ||
      !userData.username ||
      !userData.password
    )
      return res.status(400).json({ error: "Missing data" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) return res.status(400).json({ message: "Bad email format" });

    const newUser = await createUserService(userData);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login de usuario
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    const credentials = await checkCredentials(username, password);
    if (credentials) {
      const user = await getUserByUsernameService(username);
      if (user) {
        return res.json({
          login: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
          },
        });
      } else {
        return res.status(404).json({ login: false, message: "User not found" });
      }
    } else {
      return res.status(400).json({ login: false, message: "Credenciales inválidas" });
    }
  } catch (error: any) {
    return res.status(500).json({ error: "Error logging in" });
  }
};
