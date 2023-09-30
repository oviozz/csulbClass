
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
                <li className={"flex items-center gap-2"}><FaMapMarkerAlt /> Location: {Location}</li>
                <li className={"flex items-center gap-2"}><FaRegClock /> Day/Time: {Day} {Time}</li>
                <li className={"flex items-center gap-2"}><FaChalkboardTeacher /> Instructor: {Instructor}</li>
                <li className={"flex items-center gap-2"}><FaGraduationCap /> Class Type: {ClassType}</li>

                <div className={"flex justify-between items-center"}>
                    <li className={`flex items-center gap-2 ${color}`}>
                        {icon} Seats: {seatText}
                    </li>

                    <button className={'bg-blue-700 text-white font-semibold rounded-md text-sm p-1 px-2'} onClick={() => professorReviewHandler(Instructor)}>
                        Review
                    </button>
                </div>
            </ul>
        </li>
    );
}

function ClassSchedulesCard({ courseData }) {
    const { CourseName, CourseTitle, GEArea, Sections, Units } = courseData;

    const [ShowClasses, setShowClasses] = useState(false);
    const navigate = useNavigate();

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

    const updateShowClasses = () => {
        if (window.innerWidth <= 768) {
            setShowClasses(true);
        } else {
            setShowClasses(false);
        }
    };

    useEffect(() => {
        updateShowClasses();

        // Add event listener for window resize
        window.addEventListener('resize', updateShowClasses);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateShowClasses);
        };
    }, []);

    return (
        <div className="pl-4 pr-4 pt-4 pb-1">
            <div className="course-card rounded-md bg-white p-4 text-black shadow-lg border-2 border-black hover:drop-shadow-md " onClick={() => setShowClasses((prev) => !prev)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-wrap justify-between w-full">
                        <div className="">
                            <h2 className="text-xl font-bold">🖥️ {CourseName} - {CourseTitle}</h2>
                            <h2 style={{ fontSize: '1.1rem' }}>{GEArea}</h2>
                        </div>

                        <div className="flex gap-1">
                            <span className="rounded-full bg-gray-800 px-2 py-1 text-sm font-semibold text-white"> {Units}</span>

                            <div className="lg:block md:block hidden ">
                                {ShowClasses ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowUpRoundedIcon />}
                            </div>
                        </div>
                    </div>
                </div>

                {ShowClasses && (
                    <div className="">
                        <h3 className="mb-2 mt-4 text-lg font-semibold text-black">Sections:</h3>
                        <ul className={`grid grid-cols-1 sm:grid-cols-${numCols} lg:grid-cols-${numCols} gap-2`}>
                            {Sections.map((section, index) => (
                                <SectionCard key={index} section={section} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ClassSchedulesCard;
