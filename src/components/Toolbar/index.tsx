/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { actions, container, titleStyle } from './styles'

interface ToolbarContainerProps {
  title: string
  captionButton?: string
  searchSectorList: {
    column: string
    value: string
  }
  columns: Array<{ label: string; column: string }>
  handleColumnSelection: (event: React.ChangeEvent<{ value: '' }>) => void
  handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearch: () => void
  handleClear: () => void
  handleOpenModal?: () => void
}

export const Toolbar = ({
  title,
  captionButton,
  searchSectorList,
  columns,
  handleColumnSelection,
  handleValueChange,
  handleSearch,
  handleClear,
  handleOpenModal,
}: ToolbarContainerProps) => {
  const openModal = () => {
    if (handleOpenModal) {
      handleOpenModal()
    }
  }
  return (
    <Box sx={container}>
      <Typography style={titleStyle}>{title}</Typography>
      <Box sx={actions}>
        <FormControl sx={{ width: '130px' }} size="small">
          <InputLabel id="column">Coluna</InputLabel>
          <Select
            labelId="column"
            id="column"
            label="Coluna"
            value={searchSectorList.column}
            onChange={(e: any) => handleColumnSelection(e)}
          >
            {columns.map(({ label, column }) => (
              <MenuItem key={column} value={column}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          color="secondary"
          variant="outlined"
          label="Pesquisar"
          placeholder="Pesquisar"
          size="small"
          value={searchSectorList.value}
          onChange={handleValueChange}
          onKeyPress={({ key }) => key === 'Enter' && handleSearch()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="deletar" onClick={() => handleSearch()}>
                  <SearchIcon />
                </IconButton>
                <IconButton aria-label="limpar" onClick={() => handleClear()}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={openModal}>
          {captionButton}
        </Button>
      </Box>
    </Box>
  )
}
