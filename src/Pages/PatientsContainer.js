import { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import Patient from './Patient/Patient'

const HOST = process.env.REACT_APP_BACKEND_SERVER
const GET_PATIENTS = `${HOST}/patients`
const PATCH_PATIENT = `${HOST}/patients`

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))
function PatientsContainer () {
  const classes = useStyles()
  const [patients, setPatients] = useState(null)
  const fetchPatients = async () => {
    const resp = await fetch(GET_PATIENTS)
    const data = await resp.json()
    setPatients(data)
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const updateOrders = async (id, orders) => {
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

  const handleUpdateOrders = async (id, orders) => {
    const updatedPatients = patients.map((patient) => {
      if (patient.id === id) {
        patient.orders = orders
      }
      return patient
    })
    setPatients(updatedPatients)
    const status = await updateOrders(id, orders)
    return status
  }

  return (
    <Box className={classes.root}>
      {
        patients
          ? patients.map(({ id, name, orders }) => {
              return (
                <Patient
                  key={id}
                  id={id}
                  name={name}
                  orders={orders}
                  handleUpdateOrders={handleUpdateOrders}
                />
              )
            })
          : null
      }
    </Box>
  )
}

export default PatientsContainer
