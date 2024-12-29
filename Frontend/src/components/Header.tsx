import React from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import NavLinks from "./shared/NavLinks";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", boxShadow: "none", position: "static" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavLinks
                bg="#00fffc"
                to="/chat"
                text="Go to Chat"
                textColor="black"
              />
              <NavLinks
                bg="#51538f"
                to="/"
                text="logout"
                textColor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavLinks
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavLinks
                bg="#51538f"
                to="/signup"
                text="Signup"
                textColor="white"
              />{" "}
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
