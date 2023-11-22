/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, FormGroup, SvgIcon, Typography } from "@mui/material";
import { CustomSwitch, TypographyStyled, TypographySwitch } from "./style";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import DataGridDashboard from "./datagrid";

export function Dashboard() {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  const cardData = [
    { number: 1, title: "CH", subtitle: "$1,234", percentage: +10.44 },
    { number: 2, title: "EOS", subtitle: "$5,678", percentage: +10.44 },
    { number: 3, title: "BCH", subtitle: "$15,678", percentage: -10.44 },
    { number: 4, title: "ETC", subtitle: "$15,678", percentage: -10.44 },
    { number: 5, title: "ADA", subtitle: "$15,678", percentage: -10.44 },
    { number: 6, title: "BCH", subtitle: "$15,678", percentage: -10.44 },
    { number: 7, title: "THET", subtitle: "$15,678", percentage: -10.44 },
  ];

  const visibleCards = checked ? cardData : [];

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
        <div
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            maxWidth: "100%",
          }}
        >
          {visibleCards.map((data, index) => (
            <Box
              key={index}
              sx={{
                // width: 222,
                // height: 118,
                backgroundColor: "#FFFFFF",
                margin: 1,
                padding: 2,
                borderRadius: "8px",
                border: 1,
                borderColor: "#E5E5E5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4">{index}</Typography>
                  <SvgIcon
                    component={StarIcon}
                    sx={{ color: "#F6B87E", marginRight: 1 }}
                  />
                </Box>

                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{
                      fontSize: "28px",
                      fontWeight: 700,
                      lineHeight: "36px",
                      letterSpacing: "0em",
                      color: "#1E3146",
                    }}
                  >
                    {data.title}
                    <img
                      src={"src/assets/1.svg"}
                      alt="Small Icon"
                      style={{
                        width: "10px",
                        marginLeft: "10px",
                        marginBottom: "5px",
                      }}
                    />
                  </Typography>
                  <Typography sx={{ color: "#A7B1C2" }} variant="subtitle1">
                    {data.subtitle}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: data.percentage >= 0 ? "#16C784" : "#EA3943",
                    }}
                  >
                    {data.percentage}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </div>

      </Box>
    </Box>
  );
}
