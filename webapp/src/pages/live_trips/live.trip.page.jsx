import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@material-ui/core';
import { FETCH } from '../../utils/fetch.util';
import LiveTripListPage from './tripLive.page';
import LiveTripDetailPage from './tripLiveDetail.page';


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
    DETAIL: "DETAIL"
}


const LiveTripPage = ({ accessCode, user }) => {
    const [trips, setTrips] = useState([]);
    const [selected, setSelected] = useState(null);
    const [tab, setTab] = useState(TABS.LIST);
    const classes = useStyles();

    useEffect(() => {
        FETCH.GET("trip", "all/live", accessCode)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json()
                    setTrips(data);
                    console.log(data);
                } else {
                    console.log("ERROR");
                }
            })
    }, [accessCode, user])

    return (
        <>
            {tab === TABS.LIST &&
                <LiveTripListPage 
                    accessCode={accessCode} 
                    user={user} 
                    trips={trips}
                    onSelect={(trip) => {
                        setSelected(trip)
                        setTab(TABS.DETAIL)
                    }}
                    
                />
            }
        
            
            {tab === TABS.DETAIL &&
                <LiveTripDetailPage 
                    accessCode={accessCode} 
                    user={user} 
                    trip={selected}
                    onEdit={(trip) => {
                    }}
                    
                    toTripHistory={() => {
                        setTab(TABS.LIST)
                    }}
                />
            }
        </>
    );
}

export default LiveTripPage;