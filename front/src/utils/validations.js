// Validar el formato del nombre
export const validateName = (name) => {
  const re = /^[a-zA-Z\s]+$/;
  return re.test(String(name).toLowerCase());
};

// Validar el formato de un correo electrónico
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Validar el formato de una contraseña (al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial)
export const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

// Validar el formato de un DNI (8 dígitos numéricos)
export const validateDNI = (dni) => {
  const re = /^\d{8}$/;
  return re.test(dni);
};
