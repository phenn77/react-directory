import React, { useEffect, useState } from "react";
import {
  BgImageUpload,
  CalendarPicker,
  ImageUpload,
  Login,
  Summary,
} from "../../components/form";
import { addData } from "../../services/add";
import { HeaderWithText, Loading, StatusModal } from "../../components/ui";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Add = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Artist";

    const accessToken = sessionStorage.getItem("token");
    setToken(accessToken ? accessToken : "");

    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  /* OPEN MODAL */
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const [inputs, setInputs] = useState<any>({
    name: "",
    alias: "",
    origin: "",
    birthdate: "",
    summary: "",
    status: "ACTIVE",
    image: "",
    bgImage: "",
  });

  const [result, setResult] = useState({
    status: "",
    message: "",
  });

  const handleChange = (event: any) => {
    const name: string = event.target.name;
    const value: any = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const handleImg = (event: any, name: string) => {
    let img: string;
    if (event == null) {
      img = "";
    } else {
      img = event.target.files[0];
    }

    setInputs((values: any) => ({ ...values, [name]: img }));
  };

  const handleSubmit = (event: any) => {
    setSubmit(true);
    event.preventDefault();

    const timeout = setTimeout(() => {
      addData({
        directory: "artist",
        token: token,
        requestBody: inputs,
      })
        .then((res: any) => {
          setResult({
            status: "success",
            message: "Data created successfully.",
          });

          setTimeout(() => {
            navigate(`/artist/view`, {
              state: {
                id: res._id,
                name: res.name,
                directory: "artist",
                imageUrl: inputs.image,
              },
            });
          }, 3000);
        })
        .catch((response: any) => {
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

  return (
    <div className={"add-album"}>
      {(() => {
        if (token === "") {
          return <Login path={window.location.href} />;
        } else {
          if (isLoading) {
            return <Loading />;
          } else {
            if (isSubmit) {
              return (
                <StatusModal
                  status={result.status}
                  message={result.message}
                  open={open}
                />
              );
            } else {
              return (
                <Container className={"add-artist-container"}>
                  <Box
                    className={"artist-form"}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <HeaderWithText name={"artist"} />

                    <Box
                      className={"image-and-properties-form"}
                      sx={{
                        display: "flex",
                        // justifyContent: "space-evenly",
                        p: "30px",
                      }}
                    >
                      <Box
                        className={"upload-image-container"}
                        sx={{
                          width: 1 / 2,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Box
                          className={"upload-display-picture"}
                          sx={{
                            ...(inputs["image"] !== "" &&
                              inputs["bgImage"] === "" && {
                                pb: "20px",
                              }),
                          }}
                        >
                          <ImageUpload
                            imageFile={inputs.image}
                            onChange={(event: any) => handleImg(event, "image")}
                            onClear={() => handleImg(null, "image")}
                            required={true}
                            directory={"artist"}
                          />
                        </Box>

                        <Box className={"upload-bg-image"}>
                          <BgImageUpload
                            imageFile={inputs.bgImage}
                            onChange={(event: any) =>
                              handleImg(event, "bgImage")
                            }
                            onClear={() => handleImg(null, "bgImage")}
                          />
                        </Box>
                      </Box>

                      <Box
                        className={"properties-form"}
                        sx={{
                          width: 1 / 2,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        {/* REQUIRED */}
                        <TextField
                          onChange={(event: any) => handleChange(event)}
                          autoComplete={"off"}
                          name={"name"}
                          placeholder={"name"}
                          margin={"dense"}
                          value={inputs.name}
                          inputProps={{
                            maxLength: 50,
                          }}
                          required
                          error={!inputs.name}
                        />
                        <TextField
                          onChange={(event: any) => handleChange(event)}
                          autoComplete={"off"}
                          name={"alias"}
                          placeholder={"alias"}
                          margin={"dense"}
                          value={inputs.alias}
                          inputProps={{
                            maxLength: 20,
                          }}
                          sx={{
                            width: {
                              lg: 1 / 2,
                            },
                          }}
                        />

                        {/* REQUIRED */}
                        <TextField
                          onChange={(event: any) => handleChange(event)}
                          autoComplete={"off"}
                          name={"origin"}
                          placeholder={"origin"}
                          margin={"dense"}
                          value={inputs.origin}
                          inputProps={{
                            maxLength: 20,
                          }}
                          required
                          error={!inputs.origin}
                          sx={{
                            width: {
                              lg: 1 / 2,
                            },
                          }}
                        />

                        <CalendarPicker
                          name={"birthdate"}
                          placeholder="birthday"
                          required={false}
                          format={"DD-MM-YYYY"}
                          onChange={(event: any) =>
                            (inputs.birthdate = event["$y"])
                          }
                        />

                        {/* <FormControl> */}
                        <Select
                          sx={{
                            mt: "8px",
                            mb: "4px",
                          }}
                          name={"status"}
                          value={inputs.status}
                          onChange={(event: any) => handleChange(event)}
                        >
                          <MenuItem value={"ACTIVE"}>active</MenuItem>
                          <MenuItem value={"INACTIVE"}>inactive</MenuItem>
                          <MenuItem value={"ONHIATUS"}>on hiatus</MenuItem>
                          <MenuItem value={"DISBANDED"}>disbanded</MenuItem>
                        </Select>
                        {/* </FormControl> */}
                      </Box>
                    </Box>

                    {/* REQUIRED */}
                    <Summary
                      input={inputs.summary}
                      onChange={(event: any) => handleChange(event)}
                      error={!inputs.summary}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant={"contained"}
                        disabled={
                          !inputs.name ||
                          !inputs.origin ||
                          !inputs.summary ||
                          !inputs.image
                        }
                        onClick={(event: any) => handleSubmit(event)}
                        sx={{
                          width: "max-content",
                          mb: "20px",
                        }}
                      >
                        <Typography>submit</Typography>
                      </Button>
                    </Box>
                  </Box>
                </Container>
              );
            }
          }
        }
      })()}
    </div>
  );
};
