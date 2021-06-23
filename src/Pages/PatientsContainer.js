import { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

import { makeStyles } from '@material-ui/core/styles'

import Patient from './Patient/Patient'

const HOST = process.env.REACT_APP_BACKEND_SERVER
const GET_PATIENTS = `${HOST}/patients`

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  alertContainer: {
    display: 'flex'
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

  return (
    <Box className={classes.root}>
      {
        patients
          ? patients.map(({ id, name }) => {
              return (
                <Patient
                  key={id}
                  id={id}
                  name={name}
                  // orders={orders}
                  // handleUpdateOrders={handleUpdateOrders}
                />
              )
            })
          : (
            <Alert
              severity='warning'
              action={
                <Button onClick={fetchPatients}>
                  Try again
                </Button>
            }
            >
              Backend server is not ready.
            </Alert>
            )
      }
    </Box>
  )
}

export default PatientsContainer
