/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Typography,
} from "@mui/material";

export function Crypto() {

  const titleStyle = {
    fontWeight: 500,
    fontSize: "24px",
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="primary" sx={titleStyle}>
          Crypto
        </Typography>
      </Box>
    </Box>
  );
}
