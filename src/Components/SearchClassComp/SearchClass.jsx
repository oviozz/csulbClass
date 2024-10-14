
import React, {useEffect, useState} from "react";
import LoadingScreenUI from "../LoadingComp/LoadingScreenUI.jsx";
import ErrorScreenUI from "../ErrorComp/ErrorScreenUI.jsx";
import SearchScheduleUI from "./SearchScheduleUI.jsx";
import SearchScheduleCard from "./SearchScheduleCard.jsx";
import {Link} from "react-router-dom";
import {CircularProgress} from "@mui/joy";
import useCourseYear from "../../lib/providers/courses-year.js";


function SearchClass({userInput}){

    const { season, year } = useCourseYear();
    const [SearchClass, setSearchClass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {

            setError(false);
            setLoading(true)

            try {
                const response = await fetch(`https://csulbapi.vercel.app/search/${userInput}?season_year=${season}_${year}`);
                const data = await response.json();

                if (data.error) {
                    setError(true);
                    setSearchClass(null);
                } else {
                    setSearchClass(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);

            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [userInput, season, year]);


    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-[calc(100vh-170px)] pointer-events-none">
                <CircularProgress color={"neutral"} size={"md"} value={50}/>
                <div className="text-yellow-500 text-2xl lg:text-4xl font-bold mt-4 flex">
                    Getting Class Data
                    <div className={"dot"}>
                        <span className="dot-animation"></span>
                    </div>
                </div>

            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center drop-shadow-lg h-[calc(100vh-170px)]">
                <div className="bg-white p-8 rounded-lg shadow-md text-center border-2 border-gray-300">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">😕 Invalid Class</h1>
                    <p className="text-gray-700 text-lg mb-3">The class you are looking for does not exist in our records.</p>
                    <p className="text-gray-700 text-lg">Please {<span className={"font-bold"}>double-check</span>} the class name and try again.</p>
                </div>
            </div>
        )
    }

    if (SearchClass) {
        return (
            <SearchScheduleCard courseData={SearchClass} />
        );
    }
}

export default SearchClass;