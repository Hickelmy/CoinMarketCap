/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, FormGroup } from "@mui/material";
import { CustomSwitch, TypographyStyled, TypographySwitch } from "./style";
import { useEffect, useState } from "react";
import CustomTable from "./datagrid";
import { columns } from "./datagrid/columns";
import { CoinData } from "./interface";
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
}

export function Dashboard() {
  const [rows, setRows] = useState<CoinData[]>([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(25);
  const [total, setTotal] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);

  const [checked, setChecked] = useState(
    localStorage.getItem("highlightSwitch") === "true" || false
  );
  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    localStorage.setItem("highlightSwitch", newChecked.toString());
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

        if (elapsedTime < 60000) {
          const parsedData = JSON.parse(cachedData);
          setRows(parsedData.rows);
          setTotal(parsedData.total);
          return;
        }
      }

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&page=${skip}&per_page=${take}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();

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

      setApiError(null);
    } catch (error) {
      console.error(error);
      setApiError(
        "Ocorreu um erro ao obter os dados. Tente novamente mais tarde."
      );
    }
  }

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

  const [coinData, setCoinData] = useState<any[]>([]);
  const [starStates, setStarStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const storedStarStates = localStorage.getItem("starStates");
    const initialStarStates: Record<string, boolean> = storedStarStates
      ? JSON.parse(storedStarStates)
      : {};

    setStarStates(initialStarStates);

    const fetchData = async () => {
      const favoriteCoins = Object.keys(initialStarStates).filter(
        (coin) => initialStarStates[coin]
      );

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
        {checked && (
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
        )}
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
