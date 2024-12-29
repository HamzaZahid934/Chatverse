import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/user/login", { email, password });
  if (response.status !== 200) {
    throw new Error("Login failed");
  }
  const data = await response.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post("/user/signup", { name, email, password });
  if (response.status !== 201) {
    throw new Error("Signup failed");
  }
  const data = await response.data;
  return data;
};

export const checkAuthStatus = async () => {
  const response = await axios.get("/user/auth-status");
  if (response.status !== 200) {
    throw new Error("unable to authenticate");
  }
  const data = await response.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const response = await axios.post("/chats/new", { message });
  if (response.status !== 200) {
    throw new Error("unable to send chat request");
  }
  const data = await response.data;
  console.log(data);
  return data;
};

export const getUserChats = async () => {
  const response = await axios.get("/chats/all-chats");
  if (response.status !== 200) {
    throw new Error("unable to send chat request");
  }
  const data = await response.data;
  console.log(data);
  return data;
};

export const deleteUserChats = async () => {
  const response = await axios.delete("/chats/delete");
  if (response.status !== 200) {
    throw new Error("unable to delete chats");
  }
  const data = await response.data;
  console.log(data);
  return data;
};

export const logoutUser = async () => {
  const response = await axios.get("/user/logout");
  if (response.status !== 200) {
    throw new Error("unable to logout");
  }
  const data = await response.data;
  console.log(data);
  return data;
};
