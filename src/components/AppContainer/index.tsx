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
import { Link } from "react-router-dom";
interface AppContainerProps {
  children?: React.ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
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
          <Link to="/">
            <img
              src="src\assets\Marca com fundo (2).svg"
              alt="logo"
              style={{ height: "40px", marginRight: "16px" }}
            />
          </Link>
          <MenuList />

          <RightAppbar>
            <Link to="/login">
              <IconButtonStyled>
                <IconContainer>
                  <img
                    src={"src/assets/diamond.svg"}
                    alt="Small Icon"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "4px",
                    }}
                  />
                </IconContainer>
                Log in
              </IconButtonStyled>
            </Link>
            <Link to="/signup">
              <ButtonStyled>Sign up</ButtonStyled>
            </Link>
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
