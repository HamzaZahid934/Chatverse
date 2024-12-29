import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { AiOutlineSend } from "react-icons/ai";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-commuincator";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router-dom";
type Message = { role: "user" | "assistant"; content: string };

// Chat component
const Chat = () => {
  //navigate hook
  const navigate = useNavigate();
  //auth context
  const auth = useAuth();

  //input ref
  const inputRef = useRef<HTMLInputElement | null>(null);
  //chat messages
  const [chatMessage, setChatMessage] = useState<Message[]>([]);

  //send message to backend
  const handleSend = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) inputRef.current.value = "";
    const newMessage: Message = { role: "user", content: content };
    setChatMessage((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessage([...chatData.chats]);
  };

  const handleDeleteChat = async () => {
    try {
      toast.loading("Deleting chats...", { id: "deletechats" });
      await deleteUserChats();
      setChatMessage([]);
      toast.success("Chats deleted successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete chats", { id: "deletechats" });
    }
  };

  //get all chats
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading chats...", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessage([...data.chats]);
          toast.success("chats retrieved successfully", { id: "loadchats" });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to retrieve chats", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0].toUpperCase()}
            {auth?.user?.name.split(" ")[1][0].toUpperCase()}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            here are your chats
          </Typography>
          <Typography
            sx={{ mx: "auto", fontFamily: "work sans", my: 4, padding: 2 }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequuntur voluptatibus eos, non maiores molestiae alias ipsa
            omnis mollitia quae ex totam, facere, libero voluptate consectetur
            sed vero numquam. Voluptatum, eaque?
          </Typography>
          <Button
            onClick={handleDeleteChat}
            sx={{
              width: "200px",
              my: "auto",
              mx: "auto",
              fontWeight: 700,
              borderRadius: 3,
              color: "white",
              bgcolor: red[300],
              "&:hover": {
                bgcolor: red[400],
              },
            }}
          >
            {" "}
            clear chat
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, sm: 1, xs: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: 600,
          }}
        >
          {" "}
          Model-GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {" "}
          {chatMessage.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,29,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "20px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            sx={{ ml: "auto", color: "white", mx: 2 }}
            onClick={handleSend}
          >
            <AiOutlineSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
