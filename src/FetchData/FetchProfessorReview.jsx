import React, {useEffect, useState} from "react";
import LoadingScreenUI from "../Components/LoadingComp/LoadingScreenUI.jsx";
import ErrorScreenUI from "../Components/ErrorComp/ErrorScreenUI.jsx";


function FetchProfessorReview(){

    const [professorReview, setprofessorReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://csulbapi.vercel.app/professor/search/Ali Sharifian`);
                const data = await response.json();

                if (data.error) {
                    setError(true);
                } else {
                    professorReview(data);
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
        return <LoadingScreenUI />;
    }

    if (error) {
        return <ErrorScreenUI />
    }

    return professorReview
}


export default FetchProfessorReview;