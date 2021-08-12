import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

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

/*const rows = [
  { id: 1, FirstName: 'Loc', LastName: 'Lien', avgEmission: 30,  contactNumber: 123, totalMileAge: 20, currentlyLive: 'No' },
  { id: 2, FirstName: 'Looc', LastName: 'Lien', avgEmission: 30, contactNumber: 456, totalMileAge: 50, currentlyLive: 'No' },
  { id: 3, FirstName: 'Loooc', LastName: 'Lien', avgEmission: 30, contactNumber: 789, totalMileAge: 70, currentlyLive: 'No' },
  { id: 4, FirstName: 'Looooc', LastName: 'Lien', avgEmission: 30, contactNumber: 1234, totalMileAge: 100, currentlyLive: 'No' },
];
*/

export default function VehicleList() {
  return (
    <div style={{ justifyContent:'center', alignItems:'center', height: 400, width: '100%' }}>
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
