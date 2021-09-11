import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@material-ui/core';
import { FETCH } from '../../utils/fetch.util';
import MapPage from '../navigation/map.page';
import LiveTripPage from '../live_trips/live.trip.page';


const TABS = {
    MAP: "MAP",
    SUCCESS: "SUCCESS",
}


const NavigationPage = ({ accessCode, user }) => {
    const [tab, setTab] = useState(TABS.MAP);

    return (
        <>
            {tab === TABS.MAP &&
                <MapPage
                    accessCode={accessCode}
                    user={user}
                    onStartTrip={() => {
                        setTab(TABS.SUCCESS);
                    }}
                />

            }
            
            {tab === TABS.SUCCESS &&
                <LiveTripPage 
                    accessCode={accessCode} 
                    user={user} 
                />
            }
        </>
    );
}

export default NavigationPage;