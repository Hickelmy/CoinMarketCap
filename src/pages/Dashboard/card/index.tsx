/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Typography, SvgIcon } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface CoinCardProps {
  coinData: any;
  index: number;
}

const CoinCard: React.FC<CoinCardProps> = ({ coinData, index }) => {
  return (
    <Box
      key={index}
      sx={{
        backgroundColor: '#FFFFFF',
        margin: 1,
        padding: 2,
        borderRadius: '8px',
        border: 1,
        borderColor: '#E5E5E5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4">{index}</Typography>
          <SvgIcon component={StarIcon} sx={{ color: '#F6B87E', marginRight: 1 }} />
        </Box>

        <Box sx={{ textAlign: 'left' }}>
          <Typography
            variant="h5"
            color="primary"
            sx={{
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: '36px',
              letterSpacing: '0em',
              color: '#1E3146',
            }}
          >
            {coinData.name}
            <img
              src={'src/assets/1.svg'}
              alt="Small Icon"
              style={{
                width: '10px',
                marginLeft: '10px',
                marginBottom: '5px',
              }}
            />
          </Typography>
          <Typography sx={{ color: '#A7B1C2' }} variant="subtitle1">
            {`$${coinData.current_price}`}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: coinData.price_change_percentage_24h >= 0 ? '#16C784' : '#EA3943',
            }}
          >
            {`${coinData.price_24}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CoinCard;
