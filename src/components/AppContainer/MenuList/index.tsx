import {
  Button,
  Toolbar,
} from "@mui/material";
import { APP_PAGES } from "../../../routes/pages.routes";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../shared/themes";
// import {  useLocation } from "react-router-dom";




export function MenuList() {
  const navigate = useNavigate();
  // const location = useLocation();

  const handleNavigate = (page: string) => {
    navigate(page);
  };

  return (
    // <AppBar position="static">
      <Toolbar>
        {APP_PAGES.filter((e) => e.showMenu === true).map((item, index) => (
          <Button
            key={index}
            onClick={() => handleNavigate(item.route)}
            sx={{
              textTransform: 'none',
              marginRight: '1rem',
              borderRadius: '4px',
              ...(item.route === window.location.pathname && {
                backgroundColor: colors.primary_lightest,
                color: colors.primary_base,
              }),
            }}
          >
            {item.title}
          </Button>
        ))}
      </Toolbar>
    // </AppBar>
  );
}












