
import React, {useState} from "react";
import SearchInput from "./SearchInput.jsx";
import SearchClass from "./SearchClass.jsx";

function SearchScheduleUI(){

    const [courseSearch, setcourseSearch] = useState('')

    const courseInput = (inputVal) => {

        const inputValue = inputVal.replace(/ /g, "");
        setcourseSearch(inputValue)
    }

    return (
        <div className={"p-3 "}>

            <h1 className={"lg:text-3xl text-2xl font-bold mb-1.5"}>📓 Search Class for CSULB</h1>
            <div className={""}>
                <SearchInput inputHandler={courseInput}/>
            </div>

            {
                courseSearch ?
                    <SearchClass userInput={courseSearch}/>
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