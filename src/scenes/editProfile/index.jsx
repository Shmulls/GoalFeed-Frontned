import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Collapse,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import Team_pic from "components/TeamPic";
import BASE_URL from "back_url";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
};

const EditProfile = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [openField, setOpenField] = useState("");
  const [isSaved, setIsSaved] = useState(false); // Track whether changes are saved
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const handleTeamSelection = (team) => {
    setSelectedTeam(team);
  };

  const change = async (values, onSubmitProps) => {
    const changeResopnse = await fetch(`${BASE_URL}/users/${userId}/change`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const changeData = await changeResopnse.json();
    if (changeData.success) {
      onSubmitProps.resetForm();
      setOpenField("");
      setIsSaved(true); // Set isSaved to true when changes are saved successfully
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await change(values, onSubmitProps);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
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
            <Box>
              <Button
                variant="outlined"
                onClick={() => setOpenField("firstName")}
              >
                Change First Name
              </Button>
              <Collapse in={openField === "firstName"}>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                />
                <Button type="button" onClick={() => change(values)}>
                  Save
                </Button>
              </Collapse>
              {isSaved && (
                <Alert severity="success">
                  The changes are saved successfully
                </Alert>
              )}
            </Box>

            <Box>
              <Button
                variant="outlined"
                onClick={() => setOpenField("lastName")}
              >
                Change Last Name
              </Button>
              <Collapse in={openField === "lastName"}>
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <Button type="button" onClick={() => change(values)}>
                  Save
                </Button>
              </Collapse>
            </Box>

            <Box>
              <Button variant="outlined" onClick={() => setOpenField("email")}>
                Change Email
              </Button>
              <Collapse in={openField === "email"}>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Button type="button" onClick={() => change(values)}>
                  Save
                </Button>
              </Collapse>
            </Box>

            <Box>
              <Button
                variant="outlined"
                onClick={() => setOpenField("password")}
              >
                Change Password
              </Button>
              <Collapse in={openField === "password"}>
                <TextField
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  type="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button type="button" onClick={() => change(values)}>
                  Save
                </Button>
              </Collapse>
            </Box>

            <Box>
              <Button
                variant="outlined"
                onClick={() => setOpenField("phoneNumber")}
              >
                Change Phone Number
              </Button>
              <Collapse in={openField === "phoneNumber"}>
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
                />
                <Button type="button" onClick={() => change(values)}>
                  Save
                </Button>
              </Collapse>
            </Box>

            {/* Repeat the pattern for other fields */}

            <Button
              variant="outlined"
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
