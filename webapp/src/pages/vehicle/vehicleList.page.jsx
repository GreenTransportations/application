import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import VehicleDetailPage from './vehicleDetails.page';

// Remove hard-coded columns
const columns = [
  { field: 'id', headerName: 'Vehicle ID', width: 90 },
  {
    field: 'brandName',
    headerName: 'Brand name',
    width: 160,
    editable: true,
  },
  {
    field: 'modelName',
    headerName: 'Model name',
    width: 160,
    editable: true,
  },

  {
    field: 'Registration',
    headerName: 'Registration',
    width: 200,
    editable: true,
  },

  {
    field: 'dateRegistered',
    headerName: 'Date Registered',
    type: 'date',
    width: 200,
    editable: true,
  },

  {
    field: 'fuelEfficiency',
    headerName: 'Fuel Efficiency(km/L)',
    type: 'number',
    width: 200,
    editable: true,
  },

  {
    field: 'userRegistered',
    headerName: 'User Registered',
    width: 150,
    editable: true,
  },
];

const VehicleList = ({ accessCode, user }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    FETCH.GET("vehicle", "all", accessCode)
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json()
          setVehicles(data);
          console.log(data);
        } else {
          console.log("ERROR");
        }
      })
  }, [accessCode, user])

  return (
    /* TODO:
      Louis: use the driver data from the DB (loaded with the above FETCH call) to populate a table
      of vehicles here. 
    */
    <div style={{ justifyContent: 'center', alignItems: 'center', height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default VehicleList;