import React, { useEffect, useState } from 'react';

import { FETCH } from '../../utils/fetch.util';
import LiveTripListPage from './tripLive.page';
import LiveTripDetailPage from './tripLiveDetail.page';


const TABS = {
    LIST: "LIST",
    DETAIL: "DETAIL"
}


const LiveTripPage = ({ accessCode, user }) => {
    const [trips, setTrips] = useState([]);
    const [selected, setSelected] = useState(null);
    const [tab, setTab] = useState(TABS.LIST);

    useEffect(() => {
        FETCH.GET("trip", "all/live", accessCode)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json()
                    setTrips(data);
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