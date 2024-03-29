
import React, {useEffect, useRef, useState} from 'react';
import {
    FaMapMarkerAlt,
    FaRegClock,
    FaChalkboardTeacher,
    FaBook,
    FaGraduationCap,
    FaCheckCircle,
    FaTimesCircle, FaExclamationCircle, FaRegCopy, FaStar
} from "react-icons/fa";

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import { useNavigate } from "react-router-dom";
import "./ClassScheduleCard.css"

function SectionCard({ section, courseName}) {

    const [copied, setCopied] = useState(false);
    const [rating, setRating] = useState('');
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


    let Ratingcolor;

    if (Instructor === 'Staff'){
        Ratingcolor = "text-gray-500"
    } else if (rating === "None") {
        Ratingcolor = "text-orange-500";
    } else if (rating >= 4) {
        Ratingcolor = "text-green-500";
    } else if (rating >= 3) {
        Ratingcolor = "text-yellow-500";
    } else {
        Ratingcolor = "text-red-500";
    }

    const isStaff = Instructor === 'Staff';


    const handleSectionNumClick = () => {
        navigator.clipboard.writeText(SectionNum).then(() => {
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        });
    };

    const professorReviewHandler = (professorID) => {

        const encodedCourseName = btoa(courseName); // Encode courseName

        navigate(`/professor/${professorID}?department=${encodedCourseName}`)

    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://csulbapi.vercel.app/professor/search/${Instructor}?department=${courseName}`);
                const data = await response.json();

                if (!data.error) {
                    setRating(data["avgRating"]);
                } else {
                    setRating('None');
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [Instructor, courseName]);


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
                <li className={"flex items-center gap-2"}><FaStar /> Rating:
                    {
                        rating === "None" ?
                            <span className={`px-0.5 rounded-sm font-semibold ${Ratingcolor}`}>None</span>
                            :
                            rating === ''?
                                <span className="px-0.5 text-gray-400 loading-animation animate-pulse"></span>
                                :
                                <span className={`px-0.5 rounded-sm font-semibold ${Ratingcolor}`}>
                                    {
                                        Instructor !== 'Staff' ?
                                            (
                                                `${rating}/5`
                                            )
                                        :
                                            (

                                                'None'
                                            )
                                    }
                                </span>
                    }

                </li>
                <li className={"flex items-center gap-2"}><FaMapMarkerAlt /> Location: {Location}</li>
                <li className={"flex items-center gap-2"}><FaRegClock /> Day/Time: {Day} {Time}</li>
                <li className={"flex items-center gap-2"}><FaChalkboardTeacher /> Instructor: {Instructor}</li>
                <li className={"flex items-center gap-2"}><FaGraduationCap /> Class Type: {ClassType}</li>

                <div className={"flex justify-between items-center"}>
                    <li className={`flex items-center gap-2 ${color}`}>
                        {icon} Seats: {seatText}
                    </li>

                    <button className={`${isStaff ? 'bg-gray-500' : 'bg-blue-700'} text-white font-semibold rounded-md text-sm p-1 px-2`} onClick={() => {!isStaff && professorReviewHandler(Instructor)}}>
                        {
                            isStaff ? 'No Review' : 'Review'
                        }
                    </button>
                </div>
            </ul>
        </li>
    );
}

function ClassSchedulesCard({ courseData, department }) {

    const { CourseName, CourseTitle, GEArea, Sections, Units } = courseData;

    const [ShowClasses, setShowClasses] = useState(false);
    const navigate = useNavigate();
    const [sections, setSections] = useState([]);

    const numSections = Sections.length;
    let numCols = 1;
    if (numSections === 2) {
        numCols = 2;
    } else if (numSections === 3) {
        numCols = 3;
    } else if (numSections === 4) {
        numCols = 2;
    } else if (numSections >= 5) {
        numCols = 3;
    }

    return (
        <div className="pl-4 pr-4 pt-4 pb-1">
            <div className="course-card rounded-md bg-white p-4 text-black shadow-lg border-2 border-black hover:drop-shadow-md" onClick={() => setShowClasses((prev) => !prev)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-wrap justify-between w-full">
                        <div className="">
                            <h2 className="text-xl font-bold">🖥️ {CourseName} - {CourseTitle}</h2>
                            <h2 className={"lg:hidden md:hidden block"} style={{ fontSize: '1.1rem' }}>{GEArea}</h2>

                        </div>

                        <div className="flex gap-1">
                            <span className="rounded-full bg-gray-800 px-2 py-1 text-sm font-semibold text-white mt-2 lg:mt-0"> {Units}</span>

                            <div className="lg:block md:block hidden ">
                                {ShowClasses ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowUpRoundedIcon />}
                            </div>
                        </div>
                    </div>
                </div>

                {(ShowClasses) ? (
                    <div className="" onClick={(e) => e.stopPropagation()}>
                        <h2 className={"lg:block hidden"} style={{ fontSize: '1.1rem' }}>{GEArea}</h2>

                        <h3 className="mb-2 mt-4 text-lg font-semibold text-black">Sections:</h3>

                        <ul className={`grid grid-cols-1 sm:grid-cols-${numCols} lg:grid-cols-${numCols} gap-2`}>
                            {Sections.map((section, index) => (
                                <SectionCard key={index} section={section} courseName={department}/>
                            ))}
                        </ul>
                    </div>
                ) : null }
            </div>
        </div>
    );
}

export default ClassSchedulesCard;
