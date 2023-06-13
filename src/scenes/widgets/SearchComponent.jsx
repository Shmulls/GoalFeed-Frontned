import { useState } from "react";
import {
  Box,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import BASE_URL from "back_url";
import { useSelector } from "react-redux";
// import PostWidget from "./PostWidget";
import SearchWidget from "./SearchWidget";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsUsers, setSearchResultsUsers] = useState([]);
  const [searchResultsPosts, setSearchResultsPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showResultsModal, setShowResultsModal] = useState(false);
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
        setShowResultsModal(true); // Show the modal with search results
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

  const handleCloseResultsModal = () => {
    setShowResultsModal(false);
    navigate("/");
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
        {searchResultsUsers.map((result) => (
          <MenuItem
            key={result._id}
            onClick={() => handleMenuItemClick(result)}
          >
            {result.firstName} {result.lastName}
          </MenuItem>
        ))}
        <MenuItem onClick={() => handleSearchPosts(searchQuery)}>
          <strong>Search for '{searchQuery}' in the posts</strong>
        </MenuItem>
      </Menu>

      {/* Modal for displaying search results */}
      <Modal
        open={showResultsModal}
        onClose={handleCloseResultsModal}
        aria-labelledby="search-results-modal-title"
        aria-describedby="search-results-modal-description"
      >
        <SearchWidget
          searchResultsPosts={searchResultsPosts}
          handleCloseResultsModal={handleCloseResultsModal}
        />
      </Modal>
    </div>
  );
};

export default SearchComponent;
