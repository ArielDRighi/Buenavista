import { Credential } from "../entities/Credential";
import UserDto from "../dto/UserDto";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { createCredentialService } from "../services/credentialService";
import { UserEntity } from "../config/data-source";

// Obtener todos los usuarios
export const getAllUsersService = async (): Promise<User[]> => {
  const users: User[] = await UserEntity.find({ relations: { credential: false, appointments: true } });
  return users;
};

// Obtener un usuario por ID
export const getUserByIdService = async (id: number): Promise<User | null> => {
  return await UserEntity.findOne({ where: { id }, relations: { credential: false, appointments: true } });
};

// Obtener un usuario por nombre de usuario
export const getUserByUsernameService = async (username: string): Promise<User | null> => {
  return await UserEntity.findOne({
    where: { credential: { username } },
    relations: { credential: true, appointments: true },
  });
};

// Crear un nuevo usuario
export const createUserService = async (userData: UserDto): Promise<User> => {
  const { name, email, birthdate, nDni, username, password } = userData;

  // Crear las credenciales para el nuevo usuario
  const newCredentials: Credential = await createCredentialService({ username, password });

  // Crear el nuevo usuario
  const newUser: User = await UserEntity.create({
    name,
    email,
    birthdate,
    nDni,
    credential: newCredentials,
  });

  // Guardar el nuevo usuario en la base de datos
  await AppDataSource.getRepository(Credential).save(newCredentials);
  await UserEntity.save(newUser);

  return newUser;
};
