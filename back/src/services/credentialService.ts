import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";
import CreateCredentialsDto from "../dto/CreateCredentialsDto";

const CredentialEntity = AppDataSource.getRepository(Credential);

// Crear credenciales
export const createCredentialService = async (credentials: CreateCredentialsDto): Promise<Credential> => {
  const { username, password } = credentials;

  const newCredentials: Credential = await CredentialEntity.create({ username, password });
  await CredentialEntity.save(newCredentials);
  return newCredentials;
};

// Validar credenciales
export const checkCredentials = async (
  username: string,
  password: string
): Promise<{ username: string; password: string } | null> => {
  const foundCredential: Credential | null = await CredentialEntity.findOne({
    where: { username },
  });

  if (foundCredential?.password === password) return { username, password };
  else return null;
};
