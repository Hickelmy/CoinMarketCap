/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Content } from "./Content";
import { MenuList } from "./MenuList";

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
          {/* Logo */}
          <img
            src="src\assets\Marca com fundo (2).svg"
            alt="logo"
            style={{ height: "40px", marginRight: "16px" }}
          />

          <MenuList />

          {/* Botões à direita */}
          <Button color="inherit" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button color="inherit">Cadastre</Button>

          {/* Filtro de pesquisa */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <SearchIcon sx={{ mr: 1, color: "white" }} />
            <InputBase
              placeholder="Pesquisar..."
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "white" }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <Content>{children}</Content>
    </Box>
  );
}
