import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@material-ui/core';
import { FETCH } from '../../utils/fetch.util';
import VehicleListPage from './vehicleList.page';
import VehicleRegistrationPage from './vehicleRegistration.page';
import VehicleDetailPage from './vehicleDetails.page';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        boxShadow: "none"
    },
    tableContainer: {
        boxShadow: "none",
        marginTop: "30px"

    }
});

const TABS = {
    LIST: "LIST",
    REGISTRATION: "REGISTRATION",
    DETAIL: "DETAIL"
}


const VehiclePage = ({ accessCode, user }) => {
    const [vehicles, setVehicles] = useState([]);
    const [selected, setSelected] = useState(null);
    const [tab, setTab] = useState(TABS.LIST);
    const classes = useStyles();

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
        <>
            {tab === TABS.LIST &&
                <VehicleListPage 
                    accessCode={accessCode} 
                    user={user} 
                    vehicles={vehicles}
                    onSelect={(vehicle) => {
                        setSelected(vehicle)
                        setTab(TABS.DETAIL)
                    }}
                    toVehicleRegistration={() => {
                        setTab(TABS.REGISTRATION)
                    }}
                />
            }
            
            {tab === TABS.REGISTRATION &&
                <VehicleRegistrationPage 
                    accessCode={accessCode} 
                    user={user} 
                    onRegister={(vehicle) => {
                        setVehicles(vehicles.concat([vehicle]))
                        setTab(TABS.LIST)
                    }}
                    toVehicleList={() => {
                        setTab(TABS.LIST)
                    }}
                />
            }
            
            {tab === TABS.DETAIL &&
                <VehicleDetailPage 
                    accessCode={accessCode} 
                    user={user} 
                    vehicle={selected}
                    onEdit={(vehicle) => {
                        // Update the vehilce on the list
                    }}
                    
                    toVehicleList={() => {
                        setTab(TABS.LIST)
                    }}
                />
            }
        </>
    );
}

export default VehiclePage;