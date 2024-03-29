import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        console.log(state);
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    removePost: (state, action) => {
      const updatedPosts = state.posts.filter(
        (post) => post._id !== action.payload.postId
      );
      state.posts = updatedPosts; //use for nav from profile page to home page
    },
    getPostiLikes: (state, action) => {
      const likedPosts = state.posts.filter((post) => {
        return state.user.userId in post.likes;
      });
      console.log(likedPosts);
      // Use the 'likedPosts' array as needed
    },
    getUserId: (state, action) => {
      state.user = action.payload.user;
      return state.user.userId;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  removePost,
  getPostiLikes,
  getUserId,
} = authSlice.actions;
export default authSlice.reducer;
