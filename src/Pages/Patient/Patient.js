import { useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
// import MuiDialogTitle from '@material-ui/core/DialogTitle'

import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { makeStyles } from '@material-ui/core/styles'

import OrderTextField from './OrderTextField'

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid',
    display: 'flex'
  },
  nameContainer: {
    width: '15vw'
  },
  orderTitle: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr'
  },
  orderText: {
    gridColumnStart: 2
  },
  addButton: {
    gridColumnStart: 3
  }
}))
const Patient = ({ id, name, orders, handleUpdateOrders }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [orderTexts, setOrderTexts] = useState(orders)
  const [saveds, setSaveds] = useState(orderTexts.map(() => true))

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleAdd = () => {
    setOrderTexts([...orderTexts, ''])
  }

  const updateOrder = (i, newOrder) => {
    const orders = orderTexts
    orders[i] = newOrder
    setOrderTexts(orders)
  }

  const handleSubmit = async () => {
    const status = await handleUpdateOrders(id, orderTexts)
    console.log(status)
    setOpen(false)
  }

  const updateSavedByIdx = (idx, isSaved) => {
    const updated = saveds.map((ori, i) => i === idx ? isSaved : ori)
    setSaveds(updated)
  }

  const canSubmit = saveds.every(ele => ele)

  return (
    <Box className={classes.root}>
      <Box className={classes.nameContainer}>
        <Button className={classes.nameClicker} onClick={handleClickOpen}>
          <Avatar>{name[0]}</Avatar>
          {name}
        </Button>
      </Box>

      <Dialog onClose={handleClose} open={open}>
        <Box className={classes.orderTitle} onClose={handleClose}>
          <Typography
            className={classes.orderText}
            align='center'
            variant='h6'
          >Orders
          </Typography>
          <Button className={classes.addButton} onClick={handleAdd}>Add</Button>
        </Box>
        <DialogContent>
          {orderTexts.map((order, idx) => <OrderTextField
            key={idx}
            idx={idx}
            order={order}
            updateOrder={updateOrder}
            updateSavedByIdx={updateSavedByIdx}
                                          />)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Patient
