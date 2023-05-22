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
import { useParams } from "react-router-dom";

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

const { userId } = useParams();

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

  const handleTeamSelection = (team) => {
    setSelectedTeam(team);
  };

  const editProfile = async (values, onSubmitProps) => {
    // your code...
  };

  const change = async (values, onSubmitProps) => {
    const changeResopnse = await fetch(`${BASE_URL}/user/${userId}/change`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const changeData = await changeResopnse.json();
    if (changeData.success) {
      onSubmitProps.resetForm();
      setOpenField("");
    }
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
        onSubmit={editProfile}
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
                <Button type="button" onClick={change}>
                  Save
                </Button>
              </Collapse>
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
                <Button type="submit">Save</Button>
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
                <Button type="submit">Save</Button>
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
                <Button type="submit">Save</Button>
              </Collapse>
            </Box>

            {/* ... repeat for other fields */}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProfile;
