import bcrypt from "bcryptjs";

export const encryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = async (password, confirmPassword) => {
  return await bcrypt.compareSync(password, confirmPassword);
};
