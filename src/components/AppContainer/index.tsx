import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Autocomplete,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { Content } from "./Content";
import { MenuList } from "./MenuList";
import {
  ButtonStyled,
  // CustomSearchFilter,
  IconButtonStyled,
  IconContainer,
  RightAppbar,
  iconContainerStyles,
  // iconContainerStyles,
  // iconStyles,
  //  SearchInput,
  // iconContainerStyles,
  // iconStyles,
} from "./styles";
import axios from "axios";
// import CoinSearch from "../CoinSearch";

interface AppContainerProps {
  children?: React.ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClear = () => {
    setSelectedCoin(null);
    setSearchText("");
  };

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search/?q=${searchText}`
      );
      setOptions(response.data.coins);
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText === "") {
      setOptions([]);
      return;
    }

    fetchCoins();
  }, [searchText]);

  const handleCoinSelection = (event: any, value: any) => {
    if (value) {
      setSelectedCoin(value);
      setSearchText("");
    }
  };

  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevLocation) {
      setSelectedCoin(null);
      setSearchText("");
      setPrevLocation(location.pathname);
    }
  }, [location.pathname, prevLocation]);

  const handleReload = () => {
    window.location.href = "/";
  };


  const { coinId } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);



  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        if (!response.ok) {
          throw new Error(`Failed ao buscar os dados(Status : ${response.status})`);
        }
        const data = await response.json();
        setCoinDetails(data);

        console.log(coinDetails)
      } catch (error) {
        console.error("Error ao buscar os dados:", error);
      }
    };

    fetchCoinDetails();
  }, [coinId]);



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
          <Link to="/" 
          onClick={handleReload}
          >
            <img
              src="src\assets\Marca com fundo (2).svg"
              alt="logo"
              style={{ height: "40px", marginRight: "16px", cursor: "pointer" }}
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
            <Autocomplete
              id="coin-search"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "175px",
                height: "40px",
                top: "20px",
                left: "1600px",
                background: "#EFF2F5",
                borderRadius: "8px",
                marginLeft: "auto",
                "& .MuiInputBase-root": {
                  backgroundColor: "#EFF2F5",
                  borderRadius: "8px",
                  border: "none", // Remova a borda aqui
                },
              }}
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.name}
              options={options}
              loading={loading}
              value={selectedCoin}
              onChange={handleCoinSelection}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={handleChange}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <div style={iconContainerStyles} onClick={handleClear}>
                          <ClearIcon style={{ cursor: "pointer" }} />
                        </div>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </RightAppbar>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Content>
          {selectedCoin ? (
            <div>
              <h2>{selectedCoin.name}</h2>
            </div>
          ) : (
            children ||
            (searchText && <CircularProgress />) || <h2>Conteúdo padrão</h2>
          )}
        </Content>
      </Box>
    </Box>
  );
}
