import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import TypeAnim from "../components/shared/TypeAnim";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundImage: "linear-gradient(to bottom, #05101c, #1a1d23)",
        color: "white",
      }}
    >
      <Grid container spacing={2} sx={{ padding: 4 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" sx={{ fontWeight: 800 }}>
              Welcome to Chatverse
            </Typography>
            <TypeAnim />
            <Typography variant="body1" sx={{ padding: 2 }}>
              Join the conversation and connect with others.
            </Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.img
              className="image-inverted"
              src="/chat-gpt.png"
              alt="Chatverse"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
