
import React, {useState} from "react";
import SearchInput from "./SearchInput.jsx";
import SearchClass from "./SearchClass.jsx";
import { useSearchParams } from 'react-router-dom';
import {FaGithub} from "react-icons/fa";
import {RiUser3Line} from "react-icons/ri";

function SearchScheduleUI(){

    const [courseSearch, setcourseSearch] = useState('')
    const [searchParams] = useSearchParams();

    const cleanInput = (input) => {

        return input ? input.replace(/\s+/g, ' ').replace(/ (?=\d)/g, "").trim() : '';
    }

    const classQueryParam = cleanInput(searchParams.get('class'));


    const courseInput = (inputVal) => {

        const inputValue = cleanInput(inputVal);
        setcourseSearch(inputValue)
    }

    return (
        <div className={"p-3 "}>

            <h1 className={"lg:text-3xl text-2xl font-bold mb-1.5"}>📓 Search Class for CSULB</h1>
            <div className={""}>
                <SearchInput inputHandler={courseInput} pramsInput={classQueryParam.replace(/([A-Za-z])([0-9])/g, '$1 $2')}/>
            </div>

            {
                courseSearch || classQueryParam  ?
                    <SearchClass userInput={courseSearch || classQueryParam}/>
                    :
                    <div className="opacity-70 flex flex-col justify-center items-center text-center h-[calc(100vh-170px)]">
                        <p className="lg:text-5xl text-4xl font-bold text-yellow-500 mb-3 select-none">Explore Classes</p>
                        <p className="lg:text-3xl text-1xl text-yellow-500 select-none">To get started, enter a course to search for classes.</p>
                    </div>
            }

        </div>

    )


}


export default SearchScheduleUI;