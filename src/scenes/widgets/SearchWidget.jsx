import { Box, Typography, Button } from "@mui/material";
import PostWidget from "./PostWidget";
import { Close } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";

const SearchWidget = ({ searchResultsPosts, handleCloseResultsModal }) => {
  return (
    <div>
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Search Results for Posts
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        {searchResultsPosts.map((result) => (
          <WidgetWrapper
            key={result._id}
            sx={{ width: "40%", marginBottom: "1rem" }}
          >
            <PostWidget
              postId={result._id}
              postUserId={result.userId}
              name={result.name}
              description={result.description}
              location={result.location}
              picturePath={result.picturePath}
              userPicturePath={result.userPicturePath}
              likes={result.likes}
              saved={result.saved}
              comments={result.comments}
            />
          </WidgetWrapper>
        ))}
        <Box mt={2}>
          <Button
            variant="contained"
            onClick={handleCloseResultsModal}
            startIcon={<Close />}
          >
            Exit
          </Button>
        </Box>
      </Box>
    </div>
  );
};
export default SearchWidget;
