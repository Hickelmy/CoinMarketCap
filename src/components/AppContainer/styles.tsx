import { Box, styled, Button, InputBase, alpha } from "@mui/material";
import { colors } from "../../shared/themes";

export const BoxStyled = styled(Box)(() => ({
  // width: "100%",
  textTransform: "none",
  margin: "1rem 4rem 2rem",
  padding: "1.5rem",
  background: colors.background_dark,
}));

export const ButtonStyled = styled(Button)(() => ({
  textTransform: "none",
  height: "40px",
  padding: "10.5px 16px",
  borderRadius: "8px",
  gap: "16px",
  background: "#3C67F7",
  boxShadow: "5px 15px 30px 0px #7E7EB11A",
  color: "white",
  "&:hover": {
    backgroundColor: colors.button_hover,
  },
  margin: "0 8px",
}));

export const IconButtonStyled = styled(Button)(() => ({
  color: colors.button_text,
  backgroundColor: "transparent",
  textTransform: "none",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
  margin: "0 8px",
}));

export const IconContainer = styled("div")({
  marginRight: "0.5rem",
  display: "flex",
  alignItems: "center",
});

export const CustomSearchFilter = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "175px",
  height: "40px",
  top: "20px",
  padding: "10px",
  left: "1600px",
  background: "#EFF2F5",
  borderRadius: "8px",
  marginLeft: "auto", 
});

export const RightAppbar = styled("div")({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  marginRight: "70px",
  "@media (max-width: 600px)": {
    marginRight: "8px",
  },
});

export const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "#A7B1C2",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "19px",
  letterSpacing: "0em",
  textAlign: "left",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.5, 1),
  },
}));

export const BarIcon = styled("div")({
  width: "20px",
  height: "20px",
  top: "10px",
  left: "147px",
  borderRadius: "4px",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
});

export const BarIconContent = styled("div")({
  width: "14px",
  height: "2px",
  backgroundColor: "#333", 
});

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const iconContainerStyles = {
  backgroundColor: "#A7B1C2",
  borderRadius: "4px",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "8px",
};

export const iconStyles = {
  width: "12px",
  height: "12px",
  transform: "rotate(-25deg)"
};
