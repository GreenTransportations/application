import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';


// Material UI Icons
import AddIcon from '@material-ui/icons/Add';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';


// Other Components
import TripTable from '../../components/table/trip.table.component';
import { FETCH } from '../../utils/fetch.util';


// Style
const useStyles = makeStyles((theme) => ({
    squareButton: {
        color: "ffffff",
        boxShadow: "none",
        borderRadius: 180,
        fontWeight: "normal"
    }
}));


const DashboardPage = ({accessCode, user}) => {
    const history = useHistory();
    const classes = useStyles();
    const [weeklyReport, setWeeklyReport] = useState([]);

    useEffect(() => {
        FETCH.GET("report", "2021/weekly", accessCode)
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json()
                    setWeeklyReport(data.map(report => ({...report, emission: report.emission.toFixed(4)})));
                } else {
                    console.log("ERROR");
                }
            })
    }, [accessCode, user])

    const width = window.innerWidth;
    
    return (
        <div
            style={{padding: "30px"}}
        >
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={1}
            >
                <Grid 
                    item
                    xs={3}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.squareButton}
                        endIcon={<AddIcon />}
                        onClick={() => {
                            history.push("/map");
                        }}
                    >
                        Start a New Trip
                    </Button>
                </Grid>

                <Grid 
                    item
                    xs={3}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.squareButton}
                        endIcon={<CompareArrowsIcon />}
                        onClick={() => {
                            history.push("/trips");
                        }}
                    >
                        Check Trip History
                    </Button>
                </Grid>
                
            
            </Grid>
            <Grid
                container
                direction="row"
                spacing={1}
                justify="space-around"
                alignItems="center"
            >

                <Grid 
                    item
                >
                        <BarChart
                            width={width / 1.3}
                            height={400}
                            data={weeklyReport}
                            margin={{
                                top: 5,
                                right: 0,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <Brush dataKey="name" height={40} stroke="#078f61" />
                            <XAxis dataKey="week">
                                <Label value="Week of the Year" offset={-25} position="insideBottom" />
                            </XAxis>
                            <YAxis dataKey="emission">
                                <Label value="C02 (metric tonnes)" angle={-90} position="insideLeft" />
                            </YAxis>
                            <Tooltip offset={30}/>
                            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                            <Bar dataKey="emission" fill="#078f61" />
                        </BarChart>
                </Grid>
            </Grid>
            <TripTable accessCode={accessCode} user={user}/>
        </div>
    )
}

export default DashboardPage;