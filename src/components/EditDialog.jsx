import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const EditDialog = ({ isOpen, onClose, onSave, initialDescription }) => {
  const [newDescription, setNewDescription] = useState(initialDescription);

  const handleChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleSave = () => {
    onSave(newDescription);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="New Description"
          type="text"
          fullWidth
          value={newDescription}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
