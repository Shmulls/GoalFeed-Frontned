import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import logo from "./goolfeedlogo.png";
// import backlogo from "./loginPhoto.jpg";
import "./index.css"

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (

    <Box sx={{
      position: 'relative',
      minHeight: '100vh',
    }}
  >
    <Box 
      // sx={{
      //   position: 'fixed',
      //   top: 0,
      //   left: 0,
      //   right: 0,
      //   bottom: 0,
      //   width: '100%',
      //   height: '100%',
      //   backgroundImage: `url(${backlogo})`,
      //   backgroundposition:'center-top',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundSize: 'cover',
      //   filter: blur(8),
      //   zIndex: -1,
      // }}
    />
    <div className="background-image"></div>
      <Box
        width="100%"
        backgroundColor='none'
        p="1rem 6%"
        textAlign="center"
      >
        <img src={logo} alt="our Logo" width={400} />
        {/* <Typography fontWeight="bold" fontSize="32px" color="primary">
          GoalFeed
        </Typography> */}
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor='#3d34344f'
        
      >
        <Typography fontWeight="500" variant="h3" sx={{ mb: "1.5rem" }}>
          Welcome to GoalFeed, the Social Media for Soccer!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
