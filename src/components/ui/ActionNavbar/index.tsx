import React, { useEffect, useState } from "react";
import { default as LoginIcon } from "@mui/icons-material/Login";
import { AddCircle, Apps, ArrowBack, Edit, Logout } from "@mui/icons-material";
import { Avatar, AvatarGroup, Box, IconButton, Tooltip } from "@mui/material";
import { blue, green, red, grey } from "@mui/material/colors";
import { Login } from "../../form";
import { useLocation, useNavigate } from "react-router";

interface ActionProps {
  position: "top" | "left" | "right" | "bottom";
}

export const ActionNavbar = (props: ActionProps) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState<string>("");
  const [callLogin, setCallLogin] = useState<boolean>(false);
  const [callLogout, setCallLogout] = useState<boolean>(false);
  const [openHome, setOpenHome] = useState<boolean>(false);

  let currentUrl = window.location.href;
  const isAddUrl = currentUrl.includes("add");
  const isViewUrl = currentUrl.includes("view");

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    setToken(sessionToken !== null ? sessionToken : "");
  }, []);

  const logout = () => {
    setCallLogout(true);

    sessionStorage.removeItem("token");
    setToken("");

    const url = window.location.href.replaceAll("/add", "");
    window.location.href = url;
  };

  const edit = () => {
    navigate(`${state.directory}/edit`, { replace: true, state: state });
  };

  return (
    <Box
      className={"action-navbar"}
      sx={{
        bottom: 0,
        position: "fixed",
        p: "50px",
        ...(props.position === "right" && {
          right: 0,
        }),
        zIndex: 1,
      }}
    >
      {token === "" && (
        <Tooltip key={"login"} title={"login"} followCursor>
          <Avatar
            sx={{
              bgcolor: green[500],
              width: "50px",
              height: "50px",
            }}
          >
            <IconButton size={"large"} onClick={() => setCallLogin(true)}>
              <LoginIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </Avatar>
        </Tooltip>
      )}

      {callLogin && <Login path={window.location.href} />}

      {token !== "" && !openHome && (
        <Tooltip key={"home"} title={"home"} followCursor>
          <Avatar
            sx={{
              bgcolor: grey[500],
              width: "50px",
              height: "50px",
            }}
          >
            <IconButton size={"large"} onClick={() => setOpenHome(true)}>
              <Apps
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </Avatar>
        </Tooltip>
      )}

      {token !== "" && openHome && (
        <AvatarGroup
          sx={{
            display: "flex",
            flexDirection: {
              lg: "column-reverse",
            },
            "& .MuiAvatar-root": {
              mt: {
                lg: "-8px",
              },
              ml: {
                lg: "0px",
              },
            },
          }}
        >
          {!isAddUrl && !isViewUrl && (
            <Tooltip key={"add"} title={"add"} followCursor>
              <Avatar
                sx={{
                  bgcolor: blue[500],
                  width: "50px",
                  height: "50px",
                }}
              >
                <IconButton
                  size={"large"}
                  onClick={() => (window.location.href = currentUrl + "/add")}
                >
                  <AddCircle
                    sx={{
                      color: "white",
                    }}
                  />
                </IconButton>
              </Avatar>
            </Tooltip>
          )}

          {isViewUrl && (
            <Tooltip key={"edit"} title={"edit"} followCursor>
              <Avatar
                sx={{
                  bgcolor: blue[500],
                  width: "50px",
                  height: "50px",
                }}
              >
                <IconButton
                  size={"large"}
                  onClick={() => edit()}
                  //   onClick={() => (window.location.href = currentUrl + "/edit")}
                >
                  <Edit
                    sx={{
                      color: "white",
                    }}
                  />
                </IconButton>
              </Avatar>
            </Tooltip>
          )}

          <Tooltip key={"logout"} title={"logout"} followCursor>
            <Avatar
              sx={{
                bgcolor: red[500],
                width: "50px",
                height: "50px",
              }}
            >
              <IconButton size={"large"} onClick={() => logout()}>
                <Logout
                  sx={{
                    color: "white",
                  }}
                />
              </IconButton>
            </Avatar>
          </Tooltip>

          <Tooltip key={"back"} title={"back"} followCursor>
            <Avatar
              sx={{
                bgcolor: grey[500],
                width: "50px",
                height: "50px",
              }}
            >
              <IconButton size={"large"} onClick={() => setOpenHome(false)}>
                <ArrowBack
                  sx={{
                    color: "white",
                  }}
                />
              </IconButton>
            </Avatar>
          </Tooltip>
        </AvatarGroup>
      )}
    </Box>
  );
};
