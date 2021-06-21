import { useState, useEffect } from 'react'
import Patient from './Patient/Patient'
const host = process.env.REACT_APP_BACKEND_SERVER
const fetchURL = `${host}/patients`
const updateURL = `${host}/patients`

const updateOrders = async (id, orders) => {
  const resp = await fetch(`${updateURL}/${id}`,
    {
      body: JSON.stringify({ orders: orders }),
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      }
    })
  return resp.status
}

function Patients () {
  const [patients, setPatients] = useState(null)
  useEffect(() => {
    const fetchPatients = async () => {
      const resp = await fetch(fetchURL,
        {
          method: 'GET'
        })
      const data = await resp.json()
      setPatients(data)
    }

    fetchPatients()
  }, [])

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
    <div>
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
    </div>
  )
}

export default Patients
