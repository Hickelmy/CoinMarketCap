import { FormControlLabel, Switch, SwitchProps, styled } from "@mui/material";

export const TypographyStyled = styled("h3")({
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "34px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "#000000",
});

export const TypographySwitch = styled("h3")({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  letterSpacing: "0em",
  color: "#A7B1C2",
});

export const SwitchStyled = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-thumb": {
    backgroundColor: "#3861FB",
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.mode === "dark" ? "#3861FB" : "#3861FB",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    opacity: 0.7,
  },
}));
export const CustomSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#3861FB" : "#3861FB",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
  "& .MuiSwitch-label": {
    margin: "0 8px", // Adiciona uma margem à direita e à esquerda do rótulo
  },
}));

export const CustomFormControlLabel = styled(FormControlLabel)({
  marginRight: "28px",
  width: "76px",
  height: "19px",
  top: "136px",
  left: "1630px",
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "19px",
  letterSpacing: "0em",
  textAlign: "left",
});


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




