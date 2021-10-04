import React, { useEffect, useState } from 'react';

import { FETCH } from '../../utils/fetch.util';
import { LoadScript } from '@react-google-maps/api';

import NavigationCreatePage from './navigationCreate.page';
import NavigationLivePage from './navigationLive.page';
import LiveTripPage from '../live_trips/live.trip.page';

// API Key for Google Maps
import { API_KEY } from '../../data/api.key';

const TABS = {
    MAP: "MAP",
    SUCCESS: "SUCCESS",
    LIVE: "LIVE",
}

const libraries = ['places'];

const NavigationPage = ({ accessCode, user }) => {
    const [liveTrip, setLiveTrip] = useState(null);
    const [tab, setTab] = useState(TABS.MAP);

    useEffect(() => {
        FETCH.GET("trip", "my/live", accessCode)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setLiveTrip(data);
                        setTab(TABS.LIVE);
                    }

                } else {
                    console.log("ERROR fetching live trip");
                }
            })
    }, [accessCode, user])


    return (
        <LoadScript googleMapsApiKey={API_KEY.GOOGLE_ALEX} libraries={libraries}>
            {tab === TABS.MAP &&
                <NavigationCreatePage
                    accessCode={accessCode}
                    user={user}
                    onStartTrip={(trip) => {
                        setLiveTrip(trip)
                        setTab(TABS.LIVE);
                    }}
                />

            }
            
            {tab === TABS.SUCCESS &&
                <LiveTripPage 
                    accessCode={accessCode} 
                    user={user} 
                />
            }

            
            {tab === TABS.LIVE &&
                <NavigationLivePage 
                    accessCode={accessCode} 
                    user={user} 
                    trip={liveTrip}
                    onEndTrip={() => {
                        setLiveTrip(null)
                        setTab(TABS.SUCCESS);
                    }}
                />
            }   
        </LoadScript>
    );
}

export default NavigationPage;