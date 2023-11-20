/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Content } from "./Content";
import { MenuList } from "./MenuList";
import {
  ButtonStyled,
  CustomSearchFilter,
  IconButtonStyled,
  IconContainer,
  RightAppbar,
  SearchInput,
  iconContainerStyles,
  iconStyles,
} from "./styles";
interface AppContainerProps {
  children?: React.ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
  // const [selectedTab, setSelectedTab] = React.useState(0);

  // const handleTabClick = (index: number) => {
  //   setSelectedTab(index);
  // };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="src\assets\Marca com fundo (2).svg"
            alt="logo"
            style={{ height: "40px", marginRight: "16px" }}
          />

          <MenuList />

         <RightAppbar> 
          <IconButtonStyled>
            <IconContainer>
              {/* <DiamondIcon />  */}
              <img
                src={"src/assets/diamond.svg"}
                alt="Small Icon"
                style={{ width: "24px", height: "24px", marginRight: "4px" }}
              />
            </IconContainer>
            Log in
          </IconButtonStyled>
          <ButtonStyled>Sign up</ButtonStyled>

          <CustomSearchFilter>
            <SearchIcon sx={{ mr: 1, color: "#A7B1C2" }} />
            <SearchInput
              placeholder="Buscar..."
              inputProps={{ "aria-label": "buscar" }}
            />

            <div style={iconContainerStyles}>
              <img
                src={"src/assets/linea50.png"}
                alt="Small Icon"
                style={iconStyles}
              />
            </div>
          </CustomSearchFilter>
          </RightAppbar>
        </Toolbar>
      </AppBar>

      <Content>{children}</Content>
    </Box>
  );
}
