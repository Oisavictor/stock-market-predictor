"use client";
import { TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";
import { useState } from "react";
import { Companylogo } from "../components/CompanyLogo";
import {
  SignupSubWrap,
  SignupWrap,
  InputWrap,
} from "../components/signupWrapsCard";
import { RegularText } from "../components/TextComponents/Texts";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <SignupWrap>
      <SignupSubWrap>
        <Companylogo />
        <Typography variant="h5">Create an account</Typography>
        <RegularText name="Start your 30-days free trail. No credit Card required" />
        <form>
          <InputWrap>
            <TextField
              id="fullname"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    Name{" "}
                    <Typography variant="h6" color="red">
                      *
                    </Typography>{" "}
                  </InputAdornment>
                ),
              }}
              fullWidth
              variant="standard"
              placeholder="enter your fullname here"
            />
            <TextField
              id="e-mail"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    e-mail{" "}
                    <Typography variant="h6" color="red">
                      *
                    </Typography>{" "}
                  </InputAdornment>
                ),
              }}
              fullWidth
              variant="standard"
              placeholder="enter your e-mail here"
            />
            <TextField
              id="e-mail"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              variant="standard"
              placeholder="enter your e-mail here"
            />
            <FormControl
            
            variant="standard">
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="component-helper-text">
                Must have atleast 16 alpha-numeric characters
              </FormHelperText>
            </FormControl>
          </InputWrap>
        </form>
      </SignupSubWrap>
      <SignupSubWrap>feels Good</SignupSubWrap>
    </SignupWrap>
  );
};
export default Signup;

export function InputAdornments() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
}
