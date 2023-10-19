
    import ReviewCard from "./ReviewCard.jsx";
    import React, {useEffect, useState} from "react";
    import LoadingScreenUI from "../LoadingComp/LoadingScreenUI.jsx";
    import ErrorScreenUI from "../ErrorComp/ErrorScreenUI.jsx";
    import {useLocation, useParams} from "react-router-dom";

    function ProfessorReview(){

        const { profID } = useParams();
        const { search } = useLocation();

        const [professorReview, setprofessorReview] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);

        const queryParams = new URLSearchParams(search);
        const department = queryParams.get('department');

        const decodedCourseName = atob(department);

        useEffect(() => {
            async function fetchData() {
                try {
                    const response = await fetch(`https://csulbapi.vercel.app/professor/search/${profID}?department=${decodedCourseName}`);
                    const data = await response.json();

                    if (data.error) {
                        setError(true);
                    } else {
                        setprofessorReview(data);
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
            return <LoadingScreenUI titleVal={"Professor"}/>;
        }

        if (error) {
            return <ErrorScreenUI titleVal={"Professor"} backLink={`/`} backSource={"courses"}/>
        }


        return (
                <ReviewCard professorData={professorReview} />
        )

    }


    export default ProfessorReview;