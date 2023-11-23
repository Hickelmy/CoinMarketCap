import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip, styled } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CircleIcon from "@mui/icons-material/Circle";
import InfoIcon from "@mui/icons-material/Info";
import { useCallback, useEffect, useRef, useState } from "react";
import { CustomMaterialUIButton, CustomTypographyStyled } from "./style";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import coinJson from "../../../services/coin.json";

interface CoinData {
  id: string | number;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  roi: null | any;
  last_updated: string;
}

const StarColumnContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const DataGridDashboard = ({ onCheckChange }) => {
  const [starStates, setStarStates] = useState<
    Record<string | number, boolean>
  >({});
  const [loadedRows, setLoadedRows] = useState<CoinData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState<any[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return value.toFixed(2) + "%";
  };

  const PriceCell = ({ value }: { value: number }) => (
    <div>{formatCurrency(value)}</div>
  );

  const PercentageCell = ({ value }: { value: number }) => (
    <div style={{ color: value >= 0 ? "green" : "red" }}>
      {formatPercentage(value)}
    </div>
  );

  const MarketCapCell = ({ value }: { value: number }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      {formatCurrency(value)}
    </div>
  );

  const handleStarClick = (id: string | number) => {
    setStarStates((prevStarStates) => {
      const newStarStates = { ...prevStarStates, [id]: !prevStarStates[id] };
      localStorage.setItem("starStates", JSON.stringify(newStarStates));

      onCheckChange(!starStates);

      return newStarStates;
    });

    const selectedRow = loadedRows.find((row) => row.id === id);
    if (selectedRow) {
      if (!starStates[id]) {
        const newCardData = [
          ...cardData,
          {
            number: cardData.length + 1,
            title: selectedRow.name,
            subtitle: `$${selectedRow.current_price}`,
            percentage: selectedRow.price_change_percentage_24h,
          },
        ];
        setCardData(newCardData);
        localStorage.setItem("cardData", JSON.stringify(newCardData));
      } else {
        const newCardData = cardData.filter(
          (card) => card.title !== selectedRow.name
        );
        setCardData(newCardData);
        localStorage.setItem("cardData", JSON.stringify(newCardData));
      }
    }
  };

  const coinJson: CoinData[] = [];

  const columns = [
    {
      field: "star",
      headerName: "",
      width: 50,
      renderCell: (params: { row: CoinData }) => (
        <StarColumnContainer>
          {starStates[params.row.id] ? (
            <StarIcon
              style={{ color: "#F6B87E", cursor: "pointer" }}
              onClick={() => handleStarClick(params.row.id)}
            />
          ) : (
            <StarBorderIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleStarClick(params.row.id)}
            />
          )}
        </StarColumnContainer>
      ),
    },
    {
      field: "market_cap_rank",
      headerName: "#",
      width: 50,
    },
    {
      field: "name",
      headerName: "Nome",
      width: 500,
      renderCell: (params: { row: CoinData }) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* <CircleIcon
            sx={{ color: params.row.image, marginRight: 4, flexShrink: 0 }}
          /> */}

          <img
            src={params.row.image} 
            alt={params.row.name}
            style={{
              width: 24,
              height: 24,
              marginRight: 4,
              borderRadius: "50%",
              flexShrink: 0,
            }}
          />

          <span>{params.row.name}</span>
          <br />
          <span
            style={{
              color: "#A7B1C2",
              textTransform: "uppercase",
              marginLeft: "10px",
            }}
          >
            {params.row.symbol.toUpperCase()}
          </span>
          <IconButton color="primary" style={{ flexShrink: 0 }}>
            <CustomMaterialUIButton color="info">
              <CustomTypographyStyled>Buy</CustomTypographyStyled>
            </CustomMaterialUIButton>
          </IconButton>
        </div>
      ),
    },
    {
      field: "current_price",
      headerName: "Preço",
      width: 150,
      renderCell: (params: { row: CoinData }) => (
        <PriceCell value={params.row.current_price} />
      ),
    },
    {
      field: "price_change_percentage_24h",
      headerName: "24h%",
      width: 150,
      renderCell: (params: { row: CoinData }) => (
        <PercentageCell value={params.row.price_change_percentage_24h} />
      ),
    },
    {
      field: "market_cap_change_percentage_24h",
      headerName: "7d%",
      width: 150,
      renderCell: (params: { row: CoinData }) => (
        <PercentageCell value={params.row.market_cap_change_percentage_24h} />
      ),
    },
    {
      field: "market_cap",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          Valor de mercado
          <Tooltip title="Informação" arrow>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
      width: 200,
      renderCell: (params: { row: { market_cap: string } }) => (
        <MarketCapCell value={Number(params.row.market_cap)} />
      ),
    },
  ];

  useEffect(() => {
    // Carregar dados do local storage ao iniciar
    const storedStarStates = JSON.parse(
      localStorage.getItem("starStates") || "{}"
    );
    setStarStates(storedStarStates);

    const storedCardData = JSON.parse(localStorage.getItem("cardData") || "[]");
    setCardData(storedCardData);
  }, []);

  const fetchMoreData = useCallback(async (): Promise<CoinData[]> => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd`
      );
      const newData: CoinData[] = await response.json();
      return newData;
    } catch (error) {
      console.error("Erro ao buscar mais dados:", error);

      const coinJsonString = JSON.stringify(coinJson);
  
      const newDataFromJson: CoinData[] = JSON.parse(coinJsonString);
  
      return newDataFromJson;
    } finally {
      setLoading(false);
    }
  }, []);
  

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container;
      if (scrollTop + clientHeight === scrollHeight && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newRows: CoinData[] = await fetchMoreData();
        setLoadedRows((prevRows) => [...prevRows, ...newRows]);
      } catch (error) {
        console.error("Erro ao carregar mais dados:", error);
  
        // Utilize JSON.stringify para converter coinJson em uma string JSON
        const coinJsonString = JSON.stringify(coinJson);
  
        // Utilize JSON.parse para converter a string JSON de volta para um objeto
        const newDataFromJson: CoinData[] = JSON.parse(coinJsonString);
  
        // Em caso de erro, retorne newDataFromJson
        setLoadedRows((prevRows) => [...prevRows, ...newDataFromJson]);
      }
    };
  
    fetchData();
  }, [fetchMoreData, page]);
  

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <div
      style={{ height: 400, width: "100%" }}
      // ref={containerRef}
      // onScroll={handleScroll}
    >
      <DataGrid
        rows={loadedRows}
        columns={columns}
        pagination
        autoPageSize
        disableColumnMenu={true}
        checkboxSelection={false}
        disableColumnFilter={true}
      />
    </div>
  );
};
