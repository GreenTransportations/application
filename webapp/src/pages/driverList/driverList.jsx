import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'FirstName',
    headerName: 'First name',
    width: 160,
    editable: true,
  },
  {
    field: 'LastName',
    headerName: 'Last name',
    width: 160,
    editable: true,
  },

  {
    field: 'avgEmission',
    headerName: 'Average Emissions',
    type: 'number',
    width: 200,
    editable: true,
  },

  {
    field: 'contactNumber',
    headerName: 'Contact Number',
    type: 'number',
    width: 200,
    editable: true, 
  },

  {
    field: 'totalMileAge',
    headerName: 'Total Mileage',
    type: 'number',
    width: 200,
    editable: true, 
  },

  {
    field: 'currentlyLive',
    headerName: 'Currently Live',
    width: 150,
    editable: true, 
  },
];

const rows = [
  { id: 1, FirstName: 'Loc', LastName: 'Lien', avgEmission: 30,  contactNumber: 123, totalMileAge: 20, currentlyLive: 'No' },
  { id: 2, FirstName: 'Looc', LastName: 'Lien', avgEmission: 30, contactNumber: 456, totalMileAge: 50, currentlyLive: 'No' },
  { id: 3, FirstName: 'Loooc', LastName: 'Lien', avgEmission: 30, contactNumber: 789, totalMileAge: 70, currentlyLive: 'No' },
  { id: 4, FirstName: 'Looooc', LastName: 'Lien', avgEmission: 30, contactNumber: 1234, totalMileAge: 100, currentlyLive: 'No' },
];

export default function DriverList() {
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
