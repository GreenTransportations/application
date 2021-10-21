import React, { useEffect, useState } from 'react';

import { FETCH } from '../../utils/fetch.util';
import TripDetailPage from './tripDetail.page';
import TripListPage from './tripHistory.page';


const TABS = {
    LIST: "LIST",
    DETAIL: "DETAIL"
}


const TripPage = ({ accessCode, user }) => {
    const [trips, setTrips] = useState([]);
    const [selected, setSelected] = useState(null);
    const [tab, setTab] = useState(TABS.LIST);

    useEffect(() => {
        FETCH.GET("trip", "all/my", accessCode)
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
                <TripListPage 
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
                <TripDetailPage 
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

export default TripPage;