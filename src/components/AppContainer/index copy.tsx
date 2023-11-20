/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MenuList } from "./MenuList";
import { Content } from "./Content";
import LogoCore from "../../assets/logo.svg";
import { AppBar, Drawer, DrawerHeader } from "./styles";
import VersionModal from "../ModalVersion/version";
import { List, ListItem } from "@mui/material";

interface AppContainerProps {
  children?: React.ReactNode;
}
export interface UserProps {
  name?: string;
  employee_code: string;
  token: string;
}
export function signOut() {
  window.location.href = `${process.env.REACT_APP_LOGIN_URL}`;
}

export function AppContainer({ children }: AppContainerProps) {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon color="primary" />
            </IconButton>
            <div style={{ cursor: "pointer" }} onClick={() => signOut()}>
              <img src={LogoCore} alt="Logo" />
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography
              color="secondary"
              variant="body2"
              noWrap
              component="div"
            >
              Projeto A
            </Typography>
          </Box>
        
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MenuList open={open} />
        {open && (
          <List style={{ marginTop: `auto` }}>
            <ListItem style={{ display: "flex", flexDirection: "column" }}>
              <VersionModal />
            </ListItem>
          </List>
        )}
      </Drawer>

      <Content>{children}</Content>
    </Box>
  );
}
