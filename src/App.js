import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import EditProfile from "scenes/editProfile";
import GameManager from "scenes/gamePage";
import GameComplete from "scenes/gamePage/GameComplete";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes></Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId/EditProfile"
              element={isAuth ? <EditProfile /> : <Navigate to="/" />}
            />
            <Route
              path="/:userId/Game"
              element={isAuth ? <GameManager /> : <Navigate to="/" />}
            />
            <Route
              path="/:userId/Game/GameComplete"
              element={isAuth ? <GameComplete /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
