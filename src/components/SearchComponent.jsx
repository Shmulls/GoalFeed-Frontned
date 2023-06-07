// SearchComponent.js
import { useState } from "react";
import { InputBase, IconButton, Menu, MenuItem } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import BASE_URL from "back_url";
import { useSelector } from "react-redux";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [SearchResultsUsers, setSearchResultsUsers] = useState([]);
  const [searchResultsPosts, setSearchResultsPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const handleSearchUsers = async (query) => {
    try {
      const response = await fetch(`${BASE_URL}/search/?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResultsUsers(data);
        console.log(data);
        setAnchorEl(document.getElementById("search-input"));
      } else {
        console.error(
          "Error occurred while searching for users:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error occurred while searching for users:", error);
    }
  };

  const handleSearchPosts = async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/content/?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResultsPosts(data);
        console.log("Search results for posts:", data);
      } else {
        console.error(
          "Error occurred while searching for posts:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error occurred while searching for posts:", error);
    }
  };

  const handleMenuItemClick = (result) => {
    navigate(`/profile/${result._id}`);
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (query) => {
    handleSearchUsers(query);
    handleSearchPosts(query);
  };

  const handleMenuItemClickPosts = (result) => {
    navigate(`/content/${result._id}`);
    setAnchorEl(null);
  };

  return (
    <div>
      <InputBase
        id="search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <IconButton onClick={() => handleSearch(searchQuery)}>
        <Search />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {SearchResultsUsers.map((result) => (
          <MenuItem
            key={result._id}
            onClick={() => handleMenuItemClick(result)}
          >
            {result.firstName} {result.lastName}
          </MenuItem>
        ))}
        {searchResultsPosts.map((result) => (
          <MenuItem
            key={result._id}
            onClick={() => handleMenuItemClickPosts(result)}
          >
            {result.description}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => navigate(`/search-posts?query=${searchQuery}`)}
          sx={{ backgroundColor: "lightcyan" }}
        >
          <strong>Search for '{searchQuery}' in the posts</strong>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SearchComponent;
