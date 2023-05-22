import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  EditOutlined,
  DeleteOutlined,
  TurnedInNotOutlined,
  TurnedInOutlined,
} from "@mui/icons-material";
import BASE_URL from "back_url";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, removePost, addSavedPost } from "state";
import EditDialog from "components/EditDialog";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  saved,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const isSaved = saved ? Boolean(saved[loggedInUserId]) : false;
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/delete-post`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      dispatch(removePost({ postId }));
    } else {
      // Handle error...
    }
  };

  const editPost = async (newDescription) => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/edit`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: newDescription }),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } else {
      // Handle error...
    }
  };

  const savePost = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/save`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);

  const handleChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleOpen = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSave = async (newDescription) => {
    await editPost(newDescription);
    handleClose();
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      {isEditing ? (
        <>
          <TextField
            autoFocus
            margin="dense"
            label="New Description"
            type="text"
            fullWidth
            value={newDescription}
            onChange={handleChange}
          />
          <Button onClick={() => handleSave(newDescription)}>Save</Button>
        </>
      ) : (
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
      )}
      {picturePath && (
        <img
          width="100%"
          x
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${BASE_URL}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {loggedInUserId === postUserId && (
            <FlexBetween gap="0.3rem">
              <IconButton onClick={deletePost}>
                <DeleteOutlined />
              </IconButton>
              <IconButton onClick={handleOpen}>
                <EditOutlined />
              </IconButton>
              <EditDialog
                isOpen={open}
                onClose={handleClose}
                onSave={handleSave}
                initialDescription={description}
              />
            </FlexBetween>
          )}
          {loggedInUserId !== postUserId && (
            <FlexBetween gap="0.3rem">
              <IconButton onClick={savePost}>
                {isSaved ? (
                  <TurnedInOutlined sx={{ color: primary }} />
                ) : (
                  <TurnedInNotOutlined />
                )}
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};
export default PostWidget;
