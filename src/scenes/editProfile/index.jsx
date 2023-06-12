import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Collapse,
  Alert,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BASE_URL from "back_url";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import Pic_Edit from "./pic_edit";
import Team_pic from "components/TeamPic";
import FlexBetween from "components/FlexBetween";

const profileSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email("Invalid email"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least eight characters, one uppercase letter, one lowercase letter, and one number"
    ),
  phoneNumber: yup.string(),
  picture: yup.string(),
});

const initialValuesProfile = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  picture: "",
  team: "",
};

const EditProfile = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [openField, setOpenField] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [picture, setPicture] = useState(null);
  const [isPictureChanged, setIsPictureChanged] = useState(false);
  const [isPictureOpen, setIsPictureOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [firstNameSaved, setFirstNameSaved] = useState(false);
  const [lastNameSaved, setLastNameSaved] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [phoneNumberSaved, setPhoneNumberSaved] = useState(false);
  const [pictureSaved, setPictureSaved] = useState(false);
  const [teamSaved, setTeamSaved] = useState(false);

  const handleFieldOpen = (field) => {
    if (field === "picture") {
      setIsPictureOpen((prev) => !prev);
      setIsTeamOpen(false);
    } else if (field === "team") {
      setIsTeamOpen((prev) => !prev);
      setIsPictureOpen(false);
    } else {
      setOpenField((prev) => (prev === field ? "" : field));
      setIsPictureOpen(false);
      setIsTeamOpen(false);
    }
  };

  const handleFieldSave = async (values, field) => {
    console.log("values", values);
    const changeResponse = await fetch(`${BASE_URL}/users/${userId}/change`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const changeData = await changeResponse.json();
    if (changeData.success) {
      setIsSaved(true);
      setOpenField("");
      setTimeout(() => {
        setIsSaved(false); // Reset the success message after a delay
      }, 3000);

      // Display success message for the specific field
      if (field === "firstName") {
        setFirstNameSaved(true);
      } else if (field === "lastName") {
        setLastNameSaved(true);
      } else if (field === "email") {
        setEmailSaved(true);
      } else if (field === "password") {
        setPasswordSaved(true);
      } else if (field === "phoneNumber") {
        setPhoneNumberSaved(true);
      } else if (field === "picture") {
        setPictureSaved(true);
      } else if (field === "team") {
        setTeamSaved(true);
      }
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await handleFieldSave(values);
    onSubmitProps.resetForm();
  };

  const handleTeamSelection = (team) => {
    setSelectedTeam(team);
    setIsPictureChanged(true);
  };

  const handleDrop = (acceptedFiles) => {
    setPicture(acceptedFiles[0]);
    setIsPictureChanged(true);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="top"
      alignItems="center"
      minHeight="100vh"
      gap={2}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesProfile}
        validationSchema={profileSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              alignItems="center"
              sx={{
                display: "flex",
                justifyContent: "space-between", // Adjust the value as needed to control the spacing
              }}
            >
              <Button
                variant="text"
                onClick={() => handleFieldOpen("firstName")}
              >
                Change First Name
              </Button>
              <TextField
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  width: "500px", // Replace '500px' with the desired width value
                  marginLeft: "25px",
                }}
              />
              <Button
                type="submit"
                onClick={() => handleFieldSave(values, "firstName")}
              >
                Save
              </Button>

              {firstNameSaved && (
                <Alert severity="success">
                  First Name is saved successfully.
                </Alert>
              )}
            </Box>
            <br />

            <Box
              alignItems="center"
              sx={{
                display: "flex",
                justifyContent: "space-between", // Adjust the value as needed to control the spacing
              }}
            >
              <Button
                variant="text"
                onClick={() => handleFieldOpen("lastName")}
              >
                Change Last Name
              </Button>

              <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  width: "500px", // Replace '500px' with the desired width value
                  marginLeft: "28px",
                }}
              />
              <Button
                type="submit"
                onClick={() => handleFieldSave(values, "lastName")}
              >
                Save
              </Button>

              {lastNameSaved && (
                <Alert severity="success">
                  Last Name is saved successfully.
                </Alert>
              )}
            </Box>
            <br />

            <Box
              alignItems="center"
              sx={{
                display: "flex",
                justifyContent: "space-between", // Adjust the value as needed to control the spacing
              }}
            >
              <Button variant="text" onClick={() => handleFieldOpen("email")}>
                Change Email
              </Button>

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  width: "500px", // Replace '300px' with the desired width value
                  marginLeft: "55px",
                }}
              />
              <Button
                type="submit"
                onClick={() => handleFieldSave(values, "email")}
              >
                Save
              </Button>

              {emailSaved && (
                <Alert severity="success">Email is saved successfully.</Alert>
              )}
            </Box>
            <br />

            <Box
              alignItems="center"
              sx={{
                display: "flex",
                justifyContent: "space-between", // Adjust the value as needed to control the spacing
              }}
            >
              <Button
                variant="text"
                onClick={() => handleFieldOpen("password")}
              >
                Change Password
              </Button>

              <TextField
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                type="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  width: "500px", // Replace '500px' with the desired width value
                  marginLeft: "28px",
                }}
              />
              <Button
                type="submit"
                onClick={() => handleFieldSave(values, "password")}
              >
                Save
              </Button>

              {passwordSaved && (
                <Alert severity="success">
                  Password is saved successfully.
                </Alert>
              )}
            </Box>
            <br />

            <Box
              alignItems="center"
              sx={{
                display: "flex",
                justifyContent: "space-between", // Adjust the value as needed to control the spacing
              }}
            >
              <Button
                variant="text"
                onClick={() => handleFieldOpen("phoneNumber")}
              >
                Change Phone Number
              </Button>

              <TextField
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={
                  Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                }
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{
                  width: "500px", // Replace '500px' with the desired width value
                }}
              />
              <Button
                type="submit"
                onClick={() => handleFieldSave(values, "phoneNumber")}
              >
                Save
              </Button>

              {phoneNumberSaved && (
                <Alert severity="success">
                  Phone Number is saved successfully.
                </Alert>
              )}
            </Box>
            <br />
            <br />

            <Box>
              <Button variant="text" onClick={() => handleFieldOpen("picture")}>
                {isPictureOpen ? "Change Picture" : "Change Picture"}
              </Button>

              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={handleDrop}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{picture.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
              {isPictureChanged && (
                <Button
                  type="submit"
                  onClick={() => handleFieldSave(values, "picture")}
                >
                  Save Picture
                </Button>
              )}

              {pictureSaved && (
                <Alert severity="success">Picture is saved successfully.</Alert>
              )}
            </Box>
            <br />
            <br />

            <Box>
              <Button variant="text" onClick={() => handleFieldOpen("team")}>
                {isTeamOpen ? "Change Team" : "Change Team"}
              </Button>
              <Pic_Edit handleTeamSelection={handleTeamSelection} />
              {/* selectedTeam={selectedTeam}
               handleTeamSelection={handleTeamSelection} */}
              {selectedTeam !== "" && (
                <Button
                  value={values.team}
                  type="submit"
                  onClick={() => handleFieldSave(values, "team")}
                >
                  Save Team
                </Button>
              )}
              {teamSaved && (
                <Alert severity="success">Team is saved successfully.</Alert>
              )}
            </Box>
            <br />
            <br />

            <Button
              variant="contained"
              onClick={() => navigate(`/profile/${userId}`)}
            >
              Back
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProfile;
