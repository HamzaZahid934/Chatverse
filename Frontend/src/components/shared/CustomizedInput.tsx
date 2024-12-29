import { TextField } from "@mui/material";
import React from "react";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      inputProps={{
        style: {
          width: "400px",
          color: "white",
          fontSize: "20px",
          borderRadius: "10px",
        },
      }}
      name={props.name}
      type={props.type}
      label={props.label}
    ></TextField>
  );
};

export default CustomizedInput;
