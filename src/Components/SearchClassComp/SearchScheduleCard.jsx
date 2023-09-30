


import React, {useRef, useState} from 'react';
import {
    FaMapMarkerAlt,
    FaRegClock,
    FaChalkboardTeacher,
    FaBook,
    FaGraduationCap,
    FaCheckCircle,
    FaTimesCircle, FaExclamationCircle, FaRegCopy, FaStar
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function SectionCard({ section }) {

    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();


    const {SectionNum, Location, Day, Time, OpenSeats, Instructor, Comment, ClassType} = section;

    let icon;
    let color;
    let seatText;

    if (OpenSeats === "Seats available") {
        icon = <FaCheckCircle className="text-green-500" />;
        color = "text-green-500";
        seatText = "Open"
    } else if (OpenSeats === "Seats Not available") {
        icon = <FaTimesCircle className="text-red-500" />;
        color = "text-red-500";
        seatText = "Closed"
    } else {
        icon = <FaExclamationCircle className="text-yellow-500" />;
        color = "text-yellow-500";
        seatText = "WaitList"
    }

    const handleSectionNumClick = () => {
        navigator.clipboard.writeText(SectionNum).then(() => {
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        });
    };

    const professorReviewHandler = (professorID) => {
        navigate(`/professor/${professorID}`)
    }


    return (
        <li className="section-card rounded-md bg-gray-800 p-3 text-white hover:bg-gray-900">

            <div className={"flex items-center justify-between"}>
                <h1>Section: <span className={"font-semibold"}>{SectionNum}</span></h1>
                {
                    copied ? <span className="text-white ml-2">Copied!</span>
                        :
                        <span className="text-gray-100" onClick={handleSectionNumClick} ><FaRegCopy /></span>
                }
            </div>

            <ul className={"ml-1"}>
                <li className={"flex items-center gap-2"}><FaMapMarkerAlt /> Location: <span className={"font-semibold"}>{Location}</span></li>
                <li className={"flex items-center gap-2"}><FaRegClock /> Day/Time: <span className={"font-semibold"}>{Day} {Time}</span></li>
                <li className={"flex items-center gap-2"}><FaChalkboardTeacher /> Instructor: <span className={"font-semibold"}>{Instructor}</span></li>
                <li className={"flex items-center gap-2"}><FaGraduationCap /> Class Type: <span className={"font-semibold"}>{ClassType}</span></li>

                <div className={"flex justify-between items-center"}>
                    <li className={`flex items-center gap-2 ${color}`}>
                        {icon} Seats: <span className={"font-semibold"}>{seatText}</span>
                    </li>

                    <button className={'bg-blue-700 text-white font-semibold rounded-md text-sm p-1 px-2'} onClick={() => professorReviewHandler(Instructor)}>
                        Review
                    </button>
                </div>
            </ul>
        </li>
    );
}

function SearchScheduleCard({courseData}) {

    const {CourseName, CourseTitle, GEArea, Sections, Units} = courseData;

    const numSections = Sections.length;
    let numCols = 1

    return (
        <div className={"pt-4 pb-1"}>
            <div className="course-card rounded-md bg-white p-4 text-black shadow-lg border-2 border-black">
                <div className="flex items-center justify-between">
                    <div className={"flex items-start flex-wrap justify-between w-full"}>
                        <div className="mb-3">
                            <h2 className="lg:text-2xl text-xl font-bold">🖥️ {CourseName} - {CourseTitle}</h2>
                            <h2 style={{fontSize: "1.1rem"}}>{GEArea}</h2>
                        </div>

                        <span
                            className="rounded-full bg-gray-800 px-2 py-1 lg:text-md text-sm font-semibold text-white"> {Units}
                        </span>

                    </div>
                </div>
                <div className={"lg:-mt-5"}>
                    <h3 className="mb-2 mt-4 text-lg font-semibold text-black">Sections:</h3>
                    <ul className={`grid grid-cols-1 sm:grid-cols-${numCols} lg:grid-cols-${numCols} gap-2`}>
                        {Sections.map((section, index) => (
                            <SectionCard key={index} section={section} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SearchScheduleCard;
