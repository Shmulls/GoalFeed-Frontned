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
  picturePath: "",
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
  const [droppedImage, setDroppedImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("picturePath", picture.name);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("team", values.team);

    const changeResponse = await fetch(`${BASE_URL}/users/${userId}/change`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      },
      body: formData,
    });
    const changeData = await changeResponse.json();
    if (changeData.success) {
      setOpenField("");

      setTimeout(() => {
        setSuccessMessage(""); // Reset the success message after a delay
      }, 3000);

      // Display success message for the specific field
      if (field === "firstName") {
        console.log("firstName"); // Add this line to check if the condition is being satisfied
        setSuccessMessage("First Name changed successfully.");
      } else if (field === "lastName") {
        setSuccessMessage("Last Name changed successfully.");
      } else if (field === "email") {
        setSuccessMessage("Email changed successfully.");
      } else if (field === "password") {
        setSuccessMessage("Password changed successfully.");
      } else if (field === "phoneNumber") {
        setSuccessMessage("Phone Number changed successfully.");
      } else if (field === "picture") {
        setSuccessMessage("Picture changed successfully.");
      } else if (field === "team") {
        setSuccessMessage("Team changed successfully.");
      }
    } else {
      console.log("field save failed"); // Add this line to check if the condition is being satisfied
      setSuccessMessage("Field save failed."); // Display error message for the field
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await handleFieldSave(values);
    onSubmitProps.resetForm();
  };

  const handleTeamSelection = (team, setFieldValue) => {
    setSelectedTeam(team);
    setIsPictureChanged(true);
    setFieldValue("team", team); // Set the selected team value in Formik
  };

  const handleDrop = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    const filePath = file.path; // Extract the path property from the file object
    setFieldValue("picture", filePath);
    setIsPictureChanged(true);
    setDroppedImage(URL.createObjectURL(file)); // Set the dropped image preview
    setPicture(file); // Set the selected picture in the state
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

              {successMessage && (
                <Alert severity="success">{successMessage}</Alert>
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
                onDrop={(acceptedFiles) =>
                  handleDrop(acceptedFiles, setFieldValue)
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {droppedImage ? (
                      <img
                        src={droppedImage}
                        alt="Dropped"
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                    ) : (
                      <p>Add Picture Here</p>
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
              <Pic_Edit
                handleTeamSelection={(team) =>
                  handleTeamSelection(team, setFieldValue)
                }
              />{" "}
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
