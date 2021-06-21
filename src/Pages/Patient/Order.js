import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
const Order = ({ idx, order, updateOrder }) => {
  const [edit, setEdit] = useState(false)
  const [orderText, setOrderText] = useState(order)
  const handleChange = (e) => setOrderText(e.target.value)

  const handleSave = () => {
    setEdit(false)
    updateOrder(idx, orderText)
  }

  return (
    <div>
      <TextField
        disabled={!edit}
        type='text'
        value={orderText}
        onChange={handleChange}
        // multiline
        // fullWidth
      />
      {edit
        ? (
          <Button onClick={handleSave}>
            Save
          </Button>)
        : (
          <Button onClick={() => { setEdit(true) }}>
            Edit
          </Button>)}
    </div>
  )
}

export default Order
