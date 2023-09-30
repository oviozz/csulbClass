
import React, { useState } from "react";
import ProfessorSearchInput from "./ProfessorSearchInput.jsx";
import ProfessorClass from "./ProfessorClass.jsx";

function ProfessorReviewUI() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchInput = (inputVal) => {
        // Remove spaces before numbers in the input
        const sanitizedInput = inputVal.replace(/ (?=\d)/g, "");
        setSearchQuery(sanitizedInput);
    };

    return (
        <div className="p-3">
            <h1 className="lg:text-3xl text-2xl font-bold mb-1.5">🧑‍🎓 Search Professor at CSULB</h1>
            <div className="">
                <ProfessorSearchInput inputHandler={handleSearchInput} />
            </div>

            {searchQuery ? (
                <ProfessorClass userInput={searchQuery} />
            ) : (
                <div className="opacity-70 flex flex-col justify-center items-center text-center h-[calc(100vh-170px)]">
                    <p className="lg:text-5xl text-4xl font-bold text-yellow-500 mb-3 select-none">Explore Professors</p>
                    <p className="lg:text-3xl text-1xl text-yellow-500 select-none">
                        To get started, enter a professor name to search for reviews.
                    </p>
                </div>
            )}
        </div>
    );
}

export default ProfessorReviewUI;
