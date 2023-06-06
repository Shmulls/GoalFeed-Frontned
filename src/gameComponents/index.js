import { UserProvider } from './UserContext';
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleFonts from 'react-google-fonts';
import App from './App';

ReactDOM.render(
  <UserProvider>
     <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"></GoogleFonts>
    <App />
  </UserProvider>,
  document.getElementById('root')
);

