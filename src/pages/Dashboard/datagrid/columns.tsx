import { GridColDef } from "@mui/x-data-grid";
// import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import { CustomMaterialUIButton, CustomTypographyStyled } from "./style";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import styled from "@emotion/styled";
import { IconButton, Tooltip } from "@mui/material";
import { CoinData } from "../interface";

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

//   const MarketCapCell = ({ value }: { value: number }) => (
//     <div style={{ display: "flex", alignItems: "center" }}>
//       {formatCurrency(value)}
//     </div>
//   );

//   const handleStarClick = (id: string | number) => {
//     setStarStates((prevStarStates) => {
//       const newStarStates = { ...prevStarStates, [id]: !prevStarStates[id] };
//       localStorage.setItem("starStates", JSON.stringify(newStarStates));

//       onCheckChange(!starStates);

//       return newStarStates;
//     });

// const StarColumnContainer = styled("div")({
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   });

export const columns: GridColDef[] = [
  // {
  //   field: "star",
  //   headerName: "",
  //   width: 50,
  //   //   renderCell: (params: { row: CoinData }) => (
  //   //     <StarColumnContainer>
  //   //       {starStates[params.row.id] ? (
  //   //         <StarIcon
  //   //           style={{ color: "#F6B87E", cursor: "pointer" }}
  //   //           onClick={() => handleStarClick(params.row.id)}
  //   //         />
  //   //       ) : (
  //   //         <StarBorderIcon
  //   //           style={{ cursor: "pointer" }}
  //   //           onClick={() => handleStarClick(params.row.id)}
  //   //         />
  //   //       )}
  //   //     </StarColumnContainer>
  //   //   ),
  // },
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
    renderCell: (params: { row: CoinData }) => (
      <PercentageCell value={params.row.market_cap_change_percentage_24h} />
    ),
  },
  {
    field: "market_cap",
    headerName: "Valor de mercado",
    renderHeader: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {params.field}
        <Tooltip title="Informação" arrow>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
    ),
  },
];
