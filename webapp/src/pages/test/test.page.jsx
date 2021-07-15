import React, { useEffect, useState } from 'react';
import clsx from 'clsx';


// Material UI Core Components
import { makeStyles } from '@material-ui/core/styles';
import { API_CONFIG } from '../../configs/api.config';


// Material UI Icons


// Other Components


const useStyles = makeStyles((theme) => ({
}));


const TestPage = ({}) => {
    const classes = useStyles();
    const [tests, setTests] = useState([]);

    useEffect(()=>{
        fetch(`${API_CONFIG.URL}/test/all`, {
            method: "GET"
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setTests(data.map((test) => ({
                    ...test,
                    date: new Date(test.date)
                })));

            } else {
                console.log("ERROR FETCHING TESTS");
            }

        })
    }, [])
    console.log(tests);
    return (
        <div>
            {tests.map(test => (
                <div>
                    <p>
                        Name: {test.name}
                    </p>
                    <p>
                        Date: {test.date.toLocaleDateString()}
                    </p>
                    <p>
                        Activated: {test.activated.toString()}
                    </p>
                    <p>
                        Amount: {test.amount}
                    </p>
                </div>
            ))}

        </div>
    );
}

export default TestPage;