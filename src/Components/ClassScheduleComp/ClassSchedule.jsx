
import ClassSchedulesCard from "./ClassScheduleCard.jsx";
import React, {useCallback, useEffect, useState} from "react";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import LoadingScreenUI from "../LoadingComp/LoadingScreenUI.jsx";
import ErrorScreenUI from "../ErrorComp/ErrorScreenUI.jsx";
import {useParams} from "react-router-dom";
import useCourseYear from "../../lib/providers/courses-year.js";

function ClassSchedule(){

    const { courseID } = useParams();
    const { season, year } = useCourseYear();
    const [classSchedule, setClassSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const courseCode = courseID.replace(/ /g, 'z');

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch(`https://csulbapi.vercel.app/courses/${courseCode}?season_year=${season}_${year}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.error) {
                setError(true);
            } else {
                setClassSchedule(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [courseCode, season, year]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <LoadingScreenUI titleVal={"Class"}/>;
    }

    if (error) {
        return <ErrorScreenUI titleVal={"Class"} backLink={"/"} backSource={"homepage"}/>;
    }


    return (
        <>
            <h1 className="pl-4 pr-4 pt-4 pb-1 text-3xl font-bold text-gray-900">📚 {classSchedule.Department}</h1>

            <div className="ml-4 flex items-center gap-2 text-sm text-lime-700 bg-lime-100 rounded-md px-2 p-0.5 w-fit mt-0.5">
                <InfoRoundedIcon sx={{ fontSize: "1rem" }} />
                <span className="font-semibold">Click on the card to view class sections.</span>
            </div>

            <ul>
                {
                    classSchedule["Classes"].map((course) => (
                        <ClassSchedulesCard key={course.CourseName} courseData={course} department={classSchedule.Department}/>
                    ))
                }
            </ul>


        </>
    )


}

export default ClassSchedule;