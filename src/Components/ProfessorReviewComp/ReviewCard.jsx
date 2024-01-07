
import React, { useState } from 'react';
import {
    FaStar,
    FaGraduationCap,
    FaBook,
    FaClipboardList,
    FaUserTie,
    FaChartBar,
    FaCalendarCheck,
    FaCommentAlt,
    FaChalkboardTeacher,
    FaComments
} from 'react-icons/fa';

import "./ReviewCard.css"
import ProfessorTags from "./ProfessorTags.jsx";

function ReviewCard({ professorData }) {
    const { firstName, lastName, department, avgRating, avgDifficulty, numRatings, Comments } = professorData;

    const [selectedCourse, setSelectedCourse] = useState("All"); // Initialize with "All" as the default option

    const courseOptions = ["All", ...new Set(Comments.map(comment => comment.Course))];

    const filteredComments = selectedCourse === "All" ? Comments : Comments.filter(comment => comment.Course === selectedCourse);

    return (
        <div className="lg:p-3 p-2">
            <div className="">
                <div className="bg-white px-3 py-4 text-gray-900 rounded-md shadow-lg border-black border-2">
                    <div className="flex justify-between items-start">
                        <div>

                            <div className="text-3xl lg:text-4xl font-bold text-gray-900 flex items-center">
                                💬
                                <h1 className={"hidden lg:block mr-2"}>Professor</h1>
                                {firstName} {lastName}
                            </div>

                            <div className="mt-2">

                                <div className="flex items-center mb-1">
                                    <FaGraduationCap size={25} className=" inline-block mr-2 professor--review--label text-violet-500" />
                                    <p className="professor--review--label">
                                        <span className="professor--review--label">Department: </span>
                                            <span className={"font-semibold px-2 rounded bg-violet-100 text-violet-500"}>{department}</span>
                                    </p>
                                </div>

                                <div className="flex items-center mb-1">
                                    <FaStar size={23} className="professor--review--label inline-block mr-2 text-yellow-500" />
                                    <p className="professor--review--label text-gray-800">
                                        <span>Average Rating: </span>

                                        {
                                            avgRating !== "N/A" ? (
                                                <span className={`font-semibold px-2 rounded ${avgRating >= 4 ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'}`}>
                                                    {avgRating.toFixed(2)} / 5
                                                </span>
                                            ) : (
                                                <span className="text-red-500 font-semibold">Not Available</span>
                                            )
                                        }

                                    </p>

                                </div>

                                <div className="flex items-center mb-1">
                                    <FaClipboardList size={23} className="professor--review--label  inline-block mr-2 text-blue-500" />
                                    <p className="professor--review--label text-gray-800">
                                        <span>Average Difficulty: </span>
                                        {avgDifficulty !== "N/A" ? (
                                            <span className={`font-semibold px-2 rounded ${avgDifficulty < 3 ? 'text-yellow-500 bg-yellow-100' : 'text-red-500 bg-red-100'}`}>
                                              {avgDifficulty.toFixed(2)}
                                            </span>
                                        ) : (
                                            <span className="text-red-500 font-semibold">Not Available</span>
                                        )}
                                    </p>

                                </div>

                                <div className="flex items-center mb-1">
                                    <FaCalendarCheck size={23} className="professor--review--label inline-block mr-2 text-green-500" />
                                    <p className=" professor--review--label text-gray-800">
                                        <span>Would Take Again:</span>{" "}
                                        {
                                            professorData.wouldTakeAgain !== "N/A" ? (
                                                <span className={`font-semibold px-2 rounded ${parseFloat(professorData.wouldTakeAgain) > 50 ? 'text-blue-500 bg-blue-100' : 'text-red-500 bg-red-100'}`}>
                                                    {parseFloat(professorData.wouldTakeAgain).toFixed(0)}%
                                                </span>
                                            ) : (
                                                <span className="text-red-500 font-semibold">Not Available</span>
                                            )
                                        }

                                    </p>
                                </div>

                            </div>
                        </div>

                        <span className="rounded-full bg-gray-800 px-2 py-1 lg:text-lg text-sm font-semibold text-white flex items-center gap-1">
                          {avgRating !== "N/A" ? (
                              <>
                              <span className="lg:block hidden -mt-1">
                                <FaStar />
                              </span>
                                  {avgRating}
                              </>
                          ) : (
                              <span className="WHITE font-semibold">N/A</span>
                          )}
                        </span>

                    </div>
                    <div className="lg:mt-5 mt-4">

                        <div className={"flex justify-between items-center"}>
                            <h2 className="lg:text-4xl text-3xl font-bold text-gray-800 mb-2">Reviews</h2>

                            <div className="mb-3">
                                <select
                                    id="courseFilter"
                                    className={"text-gray-800 bg-white border-gray-800 border-2 px-1 py-1 rounded-md"}
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                >
                                    {courseOptions.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {
                            filteredComments.length <= 0 && (
                                <div className="no-comment-message text-center p-8">
                                    <div className="flex items-center justify-center">
                                        <FaComments className="text-5xl text-gray-300 mr-4" />
                                        <p className="text-xl lg:text-2xl font-semibold text-gray-500">No Comments Available</p>
                                    </div>
                                </div>
                            )
                        }

                        {filteredComments.map((comment, index) => (
                            <div key={index} className="bg-gray-800 shadow-lg rounded-lg p-4 mb-3">
                                {comment.Course !== "N/A" && (
                                    <div className="mb-3 flex justify-between items-center">

                                            <div className={"lg:flex block items-center gap-10"}>

                                                <p className="lg:text-xl text-lg text-white">
                                                    Course: <span className={"font-semibold"}>{comment.Course}</span>
                                                </p>

                                                <ul className="lg:flex hidden gap-3">

                                                    <ProfessorTags commentTag={comment.Tags}/>

                                                </ul>

                                            </div>

                                        <p className="text-white text-md lg:text-lg">
                                            {comment.Date}
                                        </p>
                                    </div>
                                )}
                                <hr className={"opacity-20 -mt-1"}></hr>
                                <div className="lg:flex flex-wrap justify-between mt-3 ">
                                    <div className="mb-3">
                                        <p className="professor--child--label text-white flex items-center">
                                            📅
                                            Attendance: {comment.Attendance}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="professor--child--label text-white flex items-center">
                                            📊
                                            Difficulty: {comment.Difficulty}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="professor--child--label text-white flex items-center">
                                            📘
                                            For Credit: {comment.ForCredit}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="professor--child--label text-white flex items-center">
                                            ⭐
                                            Grade: {comment.Grade}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="professor--child--label text-white flex items-center">
                                            📋
                                            Quality: {comment.Quality}
                                        </p>
                                    </div>

                                    <div className="md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                                        <p className="professor--child--label text-white flex items-center">
                                            🔄
                                            Take Again: {comment.TakeAgain}
                                        </p>
                                    </div>

                                    <div className="w-full">
                                        <div className="bg-gray-100 text-gray-800 p-4 rounded-lg">
                                            {comment.Comment}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;
