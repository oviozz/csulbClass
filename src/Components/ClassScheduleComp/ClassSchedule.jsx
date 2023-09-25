
import ClassSchedulesCard from "./ClassScheduleCard.jsx";
import React, {useEffect, useState} from "react";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import {FetchClassSchedule} from "../../FetchData/FetchClassSchedule.jsx";
import LoadingScreenUI from "../LoadingComp/LoadingScreenUI.jsx";
import ErrorScreenUI from "../ErrorComp/ErrorScreenUI.jsx";
import {useParams} from "react-router-dom";

function ClassSchedule(){

    const { courseID } = useParams();

    const [classSchedule, setClassSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const courseCode = courseID.toUpperCase().replace(/ /g, 'z').replace(/\//g, 'x');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://csulbapi.vercel.app/courses/${courseCode}`);
                const data = await response.json();

                if (data.error) {
                    setError(true);
                } else {
                    setClassSchedule(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    if (loading) {
        return <LoadingScreenUI titleVal={"Class"}/>;
    }

    if (error) {
        return <ErrorScreenUI titleVal={"Class"} backLink={`/course/${courseID}`} backSource={"homepage"}/>
    }

    return (
        <>
            <h1 className="pl-4 pr-4 pt-4 pb-1 text-3xl font-bold text-gray-900">📚 {classSchedule.Department}</h1>

            <div className="ml-4 flex items-center gap-2 text-sm text-lime-700 bg-lime-100 rounded-md px-2 p-0.5 w-fit mt-0.5">
                <InfoRoundedIcon sx={{ fontSize: "1rem" }} />
                <span className="font-semibold">Click on the section to view more details.</span>
            </div>

            <ul>
                {
                    classSchedule["Classes"].map((course) => (
                        <ClassSchedulesCard key={course.CourseName} courseData={course}/>
                    ))
                }
            </ul>


        </>
    )


}

export default ClassSchedule;