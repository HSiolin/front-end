export const login = (email) => {
  localStorage.setItem("user", email);
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getUsuario = () => {
  return localStorage.getItem("user");
};
