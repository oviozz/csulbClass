
import React, { useState } from 'react';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { IoIosArrowUp } from "react-icons/io";
import "./CoursesView.css"
import CourseCard from "./CourseCard.jsx";
import {CourseListData} from "../../Datas/CourseListData.jsx";
import {useNavigate} from "react-router-dom";

const CoursesView = () => {


    const [isGridView, setIsGridView] = useState(true);

    const toggleView = () => {
        setIsGridView((prevMode) => !prevMode);
    };

    return (
        <div>
            <div className="p-4">
                <div className="flex justify-between mb-1">
                        <div className={"lg:flex items-center gap-1"}>
                            <h1 className="text-3xl font-bold flex gap-2 items-center text-gray-900 ">👩🏻‍🏫 Fall 2024 Schedule</h1>
                        </div>
                    <button onClick={toggleView} className="text-black hover:text-gray-800 hidden sm:block" >
                        {isGridView ? (
                            <h1 className={"text-gray-800 bg-white border-gray-800 border-2 px-3 py-1 rounded-md flex items-center gap-1"}>
                                <ListRoundedIcon fontSize={"small"}/> List View
                            </h1>
                        ) : (
                            <h1 className={"text-gray-800 bg-white border-gray-800 border-2 px-3 py-1 rounded-md flex items-center gap-1 "}>
                                <GridViewRoundedIcon fontSize={"small"} /> Grid View
                            </h1>
                        )}
                    </button>
                </div>
                <div className="flex flex-wrap justify-center mt-2">
                    {Object.keys(CourseListData).map((letter) => (
                        <a
                            key={letter}
                            href={`#${letter}`}
                            className="crypto-link-nav text-black px-1 m-1 font-semibold"
                        >
                            {letter}
                        </a>
                    ))}
                </div>

                {Object.entries(CourseListData).map(([letter, courses]) => (
                    <div key={letter} id={letter} className="lg:mb-5 mb-7">
                        <div className={"flex items-center justify-between px-2"}>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">{letter}</h2>
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-light flex items-center hover:text-white text-sm"><IoIosArrowUp fontSize={17} style={{fontWeight: "lighter"}}/>scroll up</button>
                        </div>
                        {isGridView ? (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0.5 gap-3">
                                {courses.map((course, index) => (
                                    <CourseCard key={index} course={course} />
                                ))}
                            </ul>
                        ) : (
                            <ul>
                                {courses.map((course, index) => (
                                    <CourseCard key={index} course={course} />
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesView;
