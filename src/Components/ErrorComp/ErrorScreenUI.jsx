
import { Link } from 'react-router-dom';
import React from "react";

function ErrorScreenUI({titleVal, backLink, backSource}) {
    return (
        <div className="p-3 flex flex-col justify-center items-center h-[calc(100vh-72px)]">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="lg:text-4xl text-3xl font-bold text-red-500 mb-4">😕 Invalid {titleVal}</h1>
                <p className="text-gray-700 text-lg mb-3">The {titleVal.toLowerCase()} you are looking for does not exist in our records.</p>
                <p className="text-gray-700 text-lg">Please {<span className={"font-bold"}>double-check</span>} the {titleVal.toLowerCase()} name and try again.</p>
                <div className="mt-6">
                    <Link to={backLink} className="bg-blue-500 text-white p-2 rounded font-semibold hover:bg-blue-700">Go back to {backSource}</Link>
                </div>
            </div>
        </div>
    );
}

export default ErrorScreenUI;
