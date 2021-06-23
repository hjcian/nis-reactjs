import { useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import { makeStyles } from '@material-ui/core/styles'

import OrderTextField from './OrderTextField'

const HOST = process.env.REACT_APP_BACKEND_SERVER
const GET_PATIENT = `${HOST}/patients`
const PATCH_PATIENT = `${HOST}/patients`

const fetchOrders = async (id) => {
  const resp = await fetch(`${GET_PATIENT}/${id}?fields=orders`)
  const patientData = await resp.json()
  return patientData.orders
}

const submitOrders = async (id, orders) => {
  const resp = await fetch(`${PATCH_PATIENT}/${id}`,
    {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ orders: orders })
    })
  return resp.status
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  nameContainer: {
    display: 'flex',
    width: '15vw'
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  avatarName: {
    margin: '0'
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
const Patient = ({ id, name }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [edited, setEdited] = useState(false)
  const [orderTexts, setOrderTexts] = useState([])
  const [saveds, setSaveds] = useState([])

  const handleClickOpen = async () => {
    // TODO: error handling
    if (orderTexts.length === 0) {
      const orders = await fetchOrders(id)
      setOrderTexts(orders)
      setSaveds(orders.map(() => true))
    }
    setOpen(true)
  }

  const handleAddOrder = () => {
    setOrderTexts([...orderTexts, ''])
  }

  const handleClose = () => {
    setOpen(false)
  }

  const updateSingleOrder = (i, newOrder) => {
    const orders = orderTexts
    orders[i] = newOrder
    setOrderTexts(orders)
    setEdited(true)
  }

  const updateSavedByIdx = (idx, isSaved) => {
    const updated = saveds.map((ori, i) => i === idx ? isSaved : ori)
    setSaveds(updated)
  }

  const handleSubmit = async () => {
    // TODO: error handling
    const status = await submitOrders(id, orderTexts)
    console.log(status)
    setOpen(false)
  }

  const canSubmit = saveds.every(ele => ele) && edited

  return (
    <ListItem className={classes.root} button onClick={handleClickOpen}>
      <Box className={classes.nameContainer}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>{name[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          className={classes.avatarName}
          primary={name}
        />
      </Box>

      <Dialog
        onClose={handleClose} open={open}
      >
        <Box className={classes.orderTitle} onClose={handleClose}>
          <Typography
            className={classes.orderText}
            align='center'
            variant='h6'
          >Orders
          </Typography>
          <Button className={classes.addButton} onClick={handleAddOrder}>Add</Button>
        </Box>
        <DialogContent>
          {orderTexts.map((order, idx) => <OrderTextField
            key={idx}
            idx={idx}
            order={order}
            updateOrder={updateSingleOrder}
            updateSavedByIdx={updateSavedByIdx}
                                          />)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  )
}

export default Patient
