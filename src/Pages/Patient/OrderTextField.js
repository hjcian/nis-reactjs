import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const OrderTextField = ({ idx, order, updateOrder, updateSavedByIdx }) => {
  const [saved, setSaved] = useState(true)
  const [orderText, setOrderText] = useState(order)
  const handleChange = (e) => {
    setSaved(false)
    setOrderText(e.target.value)
    updateSavedByIdx(idx, false)
  }

  const handleSave = () => {
    setSaved(true)
    updateOrder(idx, orderText)
    updateSavedByIdx(idx, true)
  }

  return (
    <div>
      <TextField
        type='text'
        value={orderText}
        onChange={handleChange}
        multiline
      />
      <Button onClick={handleSave} disabled={saved}>
        Save
      </Button>
    </div>
  )
}

export default OrderTextField
