
import './App.css'
import NavBarUI from "./Components/NavBarComp/NavBarUI.jsx";
import LoadingScreenUI from "./Components/LoadingComp/LoadingScreenUI.jsx";
import CoursesView from "./Components/CoursesComp/CoursesView.jsx";
import ClassSchedule from "./Components/ClassScheduleComp/ClassSchedule.jsx";
import NavBarLayout from "./Components/NavBarComp/NavBarLayout.jsx";
import {Route, Routes} from "react-router-dom";
import ProfessorReview from "./Components/ProfessorReviewComp/ProfessorReview.jsx";
import SearchScheduleUI from "./Components/SearchClassComp/SearchScheduleUI.jsx";

function App() {

    return (
        <NavBarLayout>
            <Routes>
                <Route path={"/"} element={<SearchScheduleUI />}></Route>
                <Route path={"/course/:courseID"} element={<ClassSchedule />}></Route>
                <Route path={"/course"} element={<CoursesView />}></Route>
                <Route path={"/loading"} element={<LoadingScreenUI />}></Route>
                <Route path={"/professor/:profID"} element={<ProfessorReview />}></Route>
            </Routes>
        </NavBarLayout>
    )
}

export default App
