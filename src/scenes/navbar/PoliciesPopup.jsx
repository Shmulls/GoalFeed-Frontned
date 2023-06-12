import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const PoliciesPopup = ({ onClose }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle textAlign="center">GoalFeed Social Network Policies</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          <strong>Privacy Policy:</strong> We respect your privacy and are committed
          to protecting your personal information. We collect certain data to provide
          and improve our services, such as your name, email, and profile information.
          Your information is securely stored and used only for the intended purposes.
          We may use cookies and similar technologies to enhance your experience on
          the website. You have control over your privacy settings and can opt-out
          of certain data collection.
        </Typography>
        <Typography variant="body1">
          <strong>Terms of Service:</strong> By using GoalFeed, you agree to comply
          with our terms and conditions. Use the website responsibly and respect
          the rights of others. Prohibited activities include harassment, hate speech,
          and spamming. We reserve the right to suspend or terminate accounts for
          violating the terms. We are not responsible for any content posted by users.
        </Typography>
        <Typography variant="body1">
          <strong>Community Guidelines:</strong> Be respectful and inclusive when
          interacting with others. Report any inappropriate content or behavior. We
          promote a safe and friendly community environment. Violations of the guidelines
          may result in account suspension or termination.
        </Typography>
        <Typography variant="body1">
          <strong>Cookies Policy:</strong> We use cookies to enhance your browsing
          experience. Cookies help us analyze website traffic and improve our services.
          You can manage your cookie preferences or opt-out if desired. Third-party cookies
          may be used for analytics and advertising purposes.
        </Typography>
        <Typography variant="body1" textAlign="center">
          <strong>Create By:</strong>
        </Typography>
        <Typography variant="body1" textAlign="center">
          Yuval Amar, Lin sadon, Tal sinay, Shmuel Malikov,
          Sharon Angado, Elyasaf Sinvanai
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PoliciesPopup;
