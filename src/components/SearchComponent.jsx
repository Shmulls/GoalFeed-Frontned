// SearchComponent.js
import { useState } from "react";
import { InputBase, IconButton, Menu, MenuItem } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import BASE_URL from "back_url";
import { useSelector } from "react-redux";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${BASE_URL}/search/?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
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

  const handleMenuItemClick = (userId) => {
    navigate(`/profile/${userId}`);
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
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
        {searchResults.map((result) => (
          <MenuItem
            key={result._id}
            onClick={() => handleMenuItemClick(result._id)}
          >
            {result.firstName} {result.lastName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SearchComponent;
