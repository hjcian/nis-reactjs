import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

import Order from './Order'

const Patient = ({ id, name, orders, handleUpdateOrders }) => {
  const [open, setOpen] = useState(false)
  const [orderTexts, setOrderTexts] = useState(orders)

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

  return (
    <div>
      <Avatar>{name[0]}</Avatar>
      <Button onClick={handleClickOpen}>
        {name}
      </Button>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>
          Orders
          <Button onClick={handleAdd}>Add</Button>
        </DialogTitle>
        <DialogContent>
          {orderTexts.map((order, idx) => <Order
            key={idx}
            idx={idx}
            order={order}
            updateOrder={updateOrder}
                                          />)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Patient
