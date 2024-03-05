import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { login } from "../../../services/login";
import { StatusModal } from "../../ui";

interface LoginProps {
  path: string;
}

export const Login = (req: LoginProps) => {
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(true);

  const [input, setInput] = useState<any>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    const name: string = event.target.name;
    const value: any = event.target.value;
    setInput((values: any) => ({ ...values, [name]: value }));
  };

  const [isSubmit, setSubmit] = useState(false);
  const [result, setResult] = useState({
    status: "",
    message: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: any) => {
    setSubmit(true);
    // setLoading(true);
    event.preventDefault();

    const timeout = setTimeout(() => {
      login(input)
        .then((response) => {
          sessionStorage.setItem("token", response.token);

          setResult({
            status: "success",
            message: "login success.",
          });

          setTimeout(() => {
            setOpen(false);

            window.location.href = req.path;
          }, 3000);
        })
        .catch((response) => {
          setResult({
            status: "failed",
            message: response,
          });

          setTimeout(() => {
            setSubmit(false);
            setResult({
              status: "",
              message: "",
            });
          }, 3000);
        });
    }, 3000);

    return () => clearTimeout(timeout);
  };

  return isSubmit ? (
    <StatusModal status={result.status} message={result.message} open={open} />
  ) : (
    <Modal
      open={openModal}
      onClose={() => (window.location.href = window.location.href)}
    >
      <Box
        className={"loginModal"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "20px",
          boxShadow: 24,
          ...(!isSubmit && {
            p: 4,
          }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: "20px",
          }}
        >
          <TextField
            onChange={(event: any) => handleChange(event)}
            autoComplete={"off"}
            name={"username"}
            placeholder={"username"}
            margin={"dense"}
            value={input.username}
            inputProps={{
              maxLength: 20,
            }}
            required
            error={!input.username}
          />

          <TextField
            onChange={(event: any) => handleChange(event)}
            autoComplete={"off"}
            name={"password"}
            placeholder={"password"}
            margin={"dense"}
            value={input.password}
            inputProps={{
              maxLength: 20,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            type={showPassword ? "text" : "password"}
            error={!input.password}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "20px",
          }}
        >
          <Button
            variant={"contained"}
            disabled={!input.username || !input.password}
            onClick={(event: any) => handleSubmit(event)}
          >
            <Typography>login</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
