import * as React from 'react'
import Button from '@mui/material/Button'
import { Box, Dialog } from '@mui/material'
import { Description, Text } from './style'

export default function VersionModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const body = (
    <Box
      style={{
        padding: '35px',
      }}
    >
      <div>
        <Description>
          <span
          >
            {`${process.env.REACT_APP_TAG_VERSION}`}
            <Text>ÚLTIMA</Text>
          </span>
          <h4>{`Data: ${process.env.REACT_APP_DATE_TAG}`}</h4>
          <p> As implementações nesta versão são : </p>
          <ol>
            <li>Tela de Dashboard:</li>
            <ul>
              <li>
                Layout base do projeto.
              </li>
            </ul>

          </ol>
          <br />
          <h4>Contribuições:</h4>
          <p>
             Riquelmy Costa da Silva
          </p>
        </Description>
      </div>
    </Box>
  )

  return (
    <div>
      <Button onDoubleClick={handleOpen}>{`VERSÃO: ${process.env.REACT_APP_TAG_VERSION}`}</Button>
      <Dialog onClose={handleClose} fullWidth={true} maxWidth="md" sx={{ m: 2, p: 10 }} open={open}>
        {body}
      </Dialog>
    </div>
  )
}
