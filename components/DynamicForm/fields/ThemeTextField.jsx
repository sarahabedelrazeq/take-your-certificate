import { TextField } from "@mui/material";
import React from "react";

export default function ThemeTextField(props) {

  return (
    <TextField
      {...props}
      InputLabelProps={{
        ...props.InputLabelProps,
        style: { color: "white" },

      }}
      InputProps={{
        ...props.InputProps,
        style: { color: "white", borderColor: "white" },

      }}
      FormHelperTextProps={{
        ...props.FormHelperTextProps,
        style: { color: "white" },

        className: "mt-2",
      }}
      className="w-100"
    />
  );
}
