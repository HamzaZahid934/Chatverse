import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { configureOpenAI } from "../config/openiai-config.js";
import userModel from "../models/user-model.js";

export const generateChatCompletion = async (req, res, next) => {
  const { message } = req.body;
  try {
    const user = await userModel.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .send({ message: "user not found or token malfunctioned" });
    //grab all chats
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ role: "user", content: message });
    user.chats.push({ content: message, role: "user" });

    //send all chats with new one to openAI api
    const config = configureOpenAI();
    const openAi = new OpenAIApi(config);
    console.log("Sending chat completion request to OpenAI API...");
    const chatResponse = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    console.log("Received response from OpenAI API:", chatResponse.data);
    //push response to user
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error("Error generating chat completion:", error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const sendChatsToUser = async (req, res, next) => {
  try {
    //user login

    //check user is exisiting or not
    const user = await userModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("user not found or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send(" permission denied");
    }
    return res.status(200).json({ message: "success", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "error", cause: error.message });
  }
};

export const deleteChats = async (req, res, next) => {
  try {
    //user login

    //check user is exisiting or not
    const user = await userModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("user not found or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send(" permission denied");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "error", cause: error.message });
  }
};
