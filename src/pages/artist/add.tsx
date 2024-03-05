import React, { useEffect, useState } from "react";
import {
  BgImageUpload,
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
import { Datepicker } from "../../components/ui/Datepicker";
import { useNavigate } from "react-router-dom";

export const Add = () => {
  const navigate = useNavigate();

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

  return token === "" ? (
    <Login path={window.location.href} />
  ) : isLoading ? (
    <Loading />
  ) : isSubmit ? (
    <StatusModal status={result.status} message={result.message} open={open} />
  ) : (
    <Container>
      <Box
        className={"artistForm"}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HeaderWithText name={"artist"} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            p: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Box
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
              />
            </Box>

            <Box>
              <BgImageUpload
                imageFile={inputs.bgImage}
                onChange={(event: any) => handleImg(event, "bgImage")}
                onClear={() => handleImg(null, "bgImage")}
              />
            </Box>
          </Box>

          <Box
            sx={{
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
                maxLength: 10,
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
            />

            <Datepicker placeholder="birthday" />

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
              !inputs.name || !inputs.origin || !inputs.summary || !inputs.image
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
};
