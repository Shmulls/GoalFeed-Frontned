import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import BASE_URL from "back_url";
import Team_pic from "components/TeamPic";

const profileSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const initialValuesProfile = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  picture: "",
};

const EditProfile = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleTeamSelection = (team) => {
    setSelectedTeam(team);
  };

  const editProfile = async (values, onSubmitProps) => {
    values.team = selectedTeam;
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(`${BASE_URL}/auth/edit-profile`, {
      method: "POST",
      body: formData,
    });

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
  };

  return (
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
          // Your form fields go here // Remove fields not related to profile
          editing (e.g., password, email) // Add fields related to profile
          editing if not present (e.g., bio, date of birth)
        </form>
      )}
    </Formik>
  );
};

export default EditProfile;
