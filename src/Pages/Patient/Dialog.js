
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import Order from './Order'

const OrderDialog = ({ orderTexts, open, handleClose, handleAdd }) => {
  return (

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

  )
}

export default OrderDialog
