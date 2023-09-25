

import React, { useEffect, useState } from 'react';

export function FetchClassSchedule() {
        const [classSchedule, setClassSchedule] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://csulbapi.vercel.app/courses/CECS");
                const data = await response.json();
                setClassSchedule(data["Classes"]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    return classSchedule;
}
