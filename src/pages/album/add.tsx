import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ImageUpload,
  CalendarPicker,
  Login,
  Summary,
} from "../../components/form";
import { HeaderWithText, Loading, StatusModal } from "../../components/ui";
import { default as AddIcon } from "@mui/icons-material/Add";
import { default as RemoveIcon } from "@mui/icons-material/Remove";
import { addData } from "../../services/add";
import { AddCircle } from "@mui/icons-material";
import { getArtistName } from "../../services/get";

export const Add = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Album";

    const accessToken = sessionStorage.getItem("token");
    setToken(accessToken ? accessToken : "");

    if (state !== null && state.artistId !== undefined) {
      setInputs({ artist: state.artistId });
    }

    retrieveArtistData();
  }, []);

  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [showAddTracklist, setShowAddTracklist] = useState<boolean>(false);
  const [artistData, setArtistData] = useState<any>([]);

  const [inputs, setInputs] = useState<any>({
    name: "",
    releaseYear: "",
    summary: "",
    image: "",
    artist: "",
    tracklist: [],
  });

  const [result, setResult] = useState({
    status: "",
    message: "",
  });

  const [index, setIndex] = useState<number>(1);

  const retrieveArtistData = () => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      getArtistName().then((res: any) => {
        setArtistData(res);
        setIsLoading(false);
      });
    }, 3000);

    return () => clearTimeout(timeout);
  };

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

  const handleInputArtistName = (value: any) => {
    let artistId = value ? value._id : "";

    setInputs((values: any) => ({ ...values, artist: artistId }));
  };

  const handleShowAddTracklist = (e: any) => {
    setShowAddTracklist(true);
    addTrack(e);
  };

  const [tracklistInput] = useState<any>([]);
  const addTrack = (e: any) => {
    e.preventDefault();
    setIndex(index + 1);

    const input = (
      <TableRow
        key={`track-${index}`}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell align="center">{index}</TableCell>
        <TableCell>
          <TextField
            autoComplete={"off"}
            name={`name-${index}`}
            onChange={(event) => handleInputTracklist(index, event)}
            required
            fullWidth
          />
        </TableCell>
      </TableRow>
    );

    tracklistInput.push(input);
  };

  const deleteTrack = (e: any) => {
    e.preventDefault();

    if (tracklistInput.length === 0) {
      return setShowAddTracklist(false);
    }

    setIndex(index - 1);
    tracklistInput.pop();

    tracklist.pop();
  };

  const [tracklist] = useState<any>([]);
  const handleInputTracklist = (idx: number, event: any) => {
    const name = event.target.value;
    tracklist[idx] = name;
  };

  const handleSubmit = (event: any) => {
    setSubmit(true);
    event.preventDefault();

    const inputtedTracklist = tracklist.filter((n: string) => n);
    inputs["tracklist"] = inputtedTracklist;

    console.log(inputs);

    const timeout = setTimeout(() => {
      addData({
        directory: "album",
        token: token,
        requestBody: inputs,
      })
        .then((res: any) => {
          setResult({
            status: "success",
            message: "Data created successfully.",
          });

          setTimeout(() => {
            navigate(`/album/view`, {
              state: {
                id: res._id,
                name: res.name,
                directory: "album",
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
                <Container className={"add-album-container"}>
                  <Box
                    className={"album-form"}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <HeaderWithText name={"album"} />

                    <Box
                      className={"add-album-container"}
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
                          //   flexDirection: "column",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <ImageUpload
                          imageFile={inputs.image}
                          onChange={(event: any) => handleImg(event, "image")}
                          onClear={() => handleImg(null, "image")}
                          required={true}
                          directory={"album"}
                        />
                      </Box>

                      <Box
                        className={"input-container"}
                        sx={{
                          width: 1 / 2,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Autocomplete
                          options={artistData}
                          getOptionLabel={(option: any) => option.name}
                          onChange={(event, value) =>
                            handleInputArtistName(value)
                          }
                          autoHighlight
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="artist"
                              required
                            />
                          )}
                          sx={{
                            width: {
                              lg: "60%",
                            },
                          }}
                        />

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
                          fullWidth
                        />

                        {/* REQUIRED */}
                        <CalendarPicker
                          placeholder={"release year"}
                          name={"releaseYear"}
                          required={true}
                          format={"YYYY"}
                          onChange={(event: any) =>
                            setInputs((values: any) => ({
                              ...values,
                              releaseYear: event["$y"].toString(),
                            }))
                          }
                          error={!inputs.releaseYear}
                        />
                      </Box>
                    </Box>

                    {/* REQUIRED */}
                    <Summary
                      input={inputs.summary}
                      onChange={(event: any) => handleChange(event)}
                      error={!inputs.summary}
                    />

                    {/* ADD TRACKLIST */}

                    {!showAddTracklist ? (
                      <Box
                        className={"show-add-tracklist-button"}
                        sx={{
                          px: "30px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          sx={{
                            mb: "40px",
                            "& .MuiButton-startIcon": { margin: "0px" },
                            minWidth: 0,
                            width: "fit-content",
                          }}
                          onClick={(event: any) =>
                            handleShowAddTracklist(event)
                          }
                          color="success"
                          startIcon={<AddCircle />}
                        >
                          add tracklist
                        </Button>
                      </Box>
                    ) : (
                      <Box
                        className={"tracklist-container"}
                        sx={{
                          px: "30px",
                          pt: "20px",
                          pb: "40px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TableContainer
                          component={Paper}
                          sx={{
                            width: {
                              sm: "100%",
                              md: "70%",
                              lg: "60%",
                            },
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                          }}
                        >
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">no</TableCell>
                                <TableCell>name</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>{tracklistInput}</TableBody>
                          </Table>
                        </TableContainer>

                        <ButtonGroup
                          size="small"
                          variant="contained"
                          disableElevation
                          sx={{
                            width: {
                              sm: "100%",
                              md: "70%",
                              lg: "60%",
                            },
                          }}
                        >
                          <Button
                            sx={{
                              "& .MuiButton-startIcon": { margin: "0px" },
                              minWidth: 0,
                            }}
                            startIcon={<AddIcon />}
                            onClick={(event: any) => addTrack(event)}
                          />
                          <Button
                            sx={{
                              "& .MuiButton-startIcon": { margin: "0px" },
                              minWidth: 0,
                            }}
                            startIcon={<RemoveIcon />}
                            color="error"
                            onClick={(event: any) => deleteTrack(event)}
                          />
                        </ButtonGroup>
                      </Box>
                    )}
                    {/* ADD TRACKLIST */}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        className={"submit-button"}
                        variant={"contained"}
                        disabled={
                          !inputs.name ||
                          !inputs.artist ||
                          !inputs.releaseYear ||
                          !inputs.summary ||
                          !inputs.image ||
                          tracklist.length === 0
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
