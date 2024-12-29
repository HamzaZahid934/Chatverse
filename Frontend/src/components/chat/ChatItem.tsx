import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeBlocks(Message: string) {
  if (Message.includes("```")) {
    const codeBlocks = Message.split("```");
    return codeBlocks;
  }
}

function iscodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}
const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageblock = extractCodeBlocks(content);
  const auth = useAuth();

  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: 0 }}>
        <img src="/chat-gpt.png" alt="assistant" width={"30px"} />
      </Avatar>
      <Box>
        {!messageblock && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageblock &&
          messageblock.length &&
          messageblock.map((block) =>
            iscodeBlock(block) ? (
              //any language
              <SyntaxHighlighter
                style={coldarkDark}
                language="javascript"
                key={block}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              //plain text
              <Typography sx={{ fontSize: "20px" }} key={block}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2, my: 2 }}>
      <Avatar sx={{ ml: 0, bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0].toUpperCase()}
        {auth?.user?.name.split(" ")[1][0].toUpperCase()}
      </Avatar>
      <Box>
        {!messageblock && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageblock &&
          messageblock.length &&
          messageblock.map((block) =>
            iscodeBlock(block) ? (
              //any language
              <SyntaxHighlighter
                style={coldarkDark}
                language="javascript"
                key={block}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              //plain text
              <Typography sx={{ fontSize: "20px" }} key={block}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
