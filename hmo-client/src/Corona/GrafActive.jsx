import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Line } from 'react-chartjs-2';


const GrafActive = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/corona-summary'); 
                setData(response.data);
            } catch (error) {
                console.error('Error fetching corona data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Corona Active Cases Summary</h2>
            {/* <Line data={data} /> */}
        </div>
    );
};

export default GrafActive;