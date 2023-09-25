
import React from "react";
import "./CoursesView.css"
import {useNavigate} from "react-router-dom";

function CourseCard({course, cardClick}){

    const navigate = useNavigate();
    const courseClick = (courseID) => {
        navigate(`/course/${courseID}`);
    };

    const [title, code] = course.split(/ \(([^)]+)\)/);

    return (
        <li className="lg:mb-3 cursor-pointer lg:ml-2 rounded-md" onClick={() => courseClick(code)}>
            <div className="course-card bg-white p-4 flex justify-between items-center relative rounded-md border-2 border-black shadow-lg">
                <div className={"flex gap-2 items-center "}>
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <p className="font-normal">{code}</p>
                </div>
            </div>
        </li>
    );
}


export default CourseCard;