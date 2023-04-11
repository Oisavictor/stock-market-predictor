import { Paper, styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React from "react";


export const SignupWrap = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
 export const SignupSubWrap = styled(Box)({
    width:"40%",
    padding: "0 5%",
    // borderBottom: '1px solid blue'
 })
 export const InputWrap = styled("div")({
   width: "100%",
   display: "flex",
   alignItems: "center",
   flexDirection: "column",
  borderBottom: '1px solid #00000',
  margin: "40px auto"
 })

//  export const TextInput = styled(TextField(props: {}))({
//   backgroundColor:"red"
// })