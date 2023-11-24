/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, FormGroup, SvgIcon, Typography } from "@mui/material";
import { CustomSwitch, TypographyStyled, TypographySwitch } from "./style";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import CustomTable from "./datagrid";
import { columns } from "./datagrid/columns";
import { CoinData } from "./interface";
// import { useToast } from "../../shared/hooks/useToast";
// import { useSearch } from "../../shared/hooks/useSearch";
// import { ArrayDifference } from "../../utils/ValidatingEqualObjects";
import { debounce } from "lodash";
import CoinCard from "./card";

interface minCoinData {
  id: string;
  name: string;
  symbol: string;
  image: {
    small: string;
    large: string;
  };
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  // Adicione outras propriedades conforme necessário
}

export function Dashboard() {
  const [rows, setRows] = useState<CoinData[]>([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(25);
  const [total, setTotal] = useState(0);

  // const { actionToast } = useToast();
  // const [intervalId, setIntervalId] = useState<any | null>(null);
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  const debouncedListAll = debounce(listAll, 1000);

  async function listAll(skip: number = 1, take: number = 10) {
    try {
      console.log("Skip : ", skip);
      console.log("Take : ", take);

      // Tenta obter dados do cache
      const cachedData = localStorage.getItem(`apiData_${skip}_${take}`);
      const cachedTimestamp = localStorage.getItem(
        `apiDataTimestamp_${skip}_${take}`
      );

      if (cachedData && cachedTimestamp) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - parseInt(cachedTimestamp);

        // Verifica se o cache ainda é válido (menos de 30 minutos)
        if (elapsedTime < 1800000) {
          const parsedData = JSON.parse(cachedData);
          setRows(parsedData.rows);
          setTotal(parsedData.total);
          return;
        }
      }

      // Se não houver dados em cache ou se o cache expirou, faça uma nova solicitação à API
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&page=${skip}&per_page=${take}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();

      // Salva dados no cache e o timestamp atual
      localStorage.setItem(
        `apiData_${skip}_${take}`,
        JSON.stringify({ rows: data, total: data.length })
      );
      localStorage.setItem(
        `apiDataTimestamp_${skip}_${take}`,
        new Date().getTime().toString()
      );

      setRows(data);
      setTotal(data.length);
    } catch (error) {
      console.error(error);
    }
  }

  // Função de listagem que será chamada com debounce
  const handleListAllDebounced = (skip: number, take: number) => {
    debouncedListAll(skip, take);
  };

  useEffect(() => {
    handleListAllDebounced(skip, take);
  }, [skip, take]);

  useEffect(() => {
    listAll();
  }, [skip, take]);

  const handleSkip = (newSkip: any) => {
    setSkip(newSkip);
  };

  const handleTake = (newTake: any) => {
    setTake(newTake);
  };

  const [coinData, setCoinData] = useState<CoinData[]>([]);
  const [starStates, setStarStates] = useState<Record<string, boolean>>({});
  


  
  useEffect(() => {
    const storedStarStates = localStorage.getItem("starStates");
    const initialStarStates: Record<string, boolean> = storedStarStates
      ? JSON.parse(storedStarStates)
      : {};

    setStarStates(initialStarStates);

    const fetchData = async () => {
      // Obter as moedas guardadas no localStorage
      const favoriteCoins = Object.keys(initialStarStates).filter(
        (coin) => initialStarStates[coin]
      );

      // Fazer solicitações para a API para obter dados das moedas favoritas
      const coinRequests = favoriteCoins.map((coin) =>
        fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
      );

      try {
        const coinResponses = await Promise.all(coinRequests);
        const coinDataList = await Promise.all(
          coinResponses.map((response) => response.json())
        );

        const formattedCoinData: any[] = coinDataList.map((coinData) => ({
          id: coinData.id,
          name: coinData.name,
          symbol: coinData.symbol,
          image: {
            small: coinData.image.small,
            large: coinData.image.large,
          },
          current_price: coinData.market_data.current_price.usd,
          market_cap: coinData.market_data.market_cap.usd,
          market_cap_rank: coinData.market_data.market_cap_rank,
          price_24: coinData.market_data.price_change_percentage_24h,
        }));

        setCoinData(formattedCoinData);
      } catch (error) {
        console.error("Erro ao obter dados das moedas favoritas:", error);
      }
    };

    if (Object.keys(initialStarStates).length > 0) {
      fetchData();
    }
  }, []);



  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TypographyStyled>
          Preço das criptomoedas por valor de mercado
        </TypographyStyled>

        {/* <div >
          <Search value={FILTERS} />
        </Grid> */}

        <FormGroup
          sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <TypographySwitch sx={{ marginRight: 2 }}>
            Highlights
          </TypographySwitch>
          <CustomSwitch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </FormGroup>
      </Box>

      <Box>
        <div
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            maxWidth: "100%",
          }}
        >
          {coinData.map((data, index) => (
            <CoinCard key={index} coinData={data} index={index} />
          ))}
        </div>
        <div
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            maxWidth: "100%",
          }}
        ></div>
        <CustomTable
          columns={columns}
          rows={rows}
          handleSkip={handleSkip}
          handleTake={handleTake}
          skip={skip}
          take={take}
          total={total}
        />
      </Box>
    </Box>
  );
}
