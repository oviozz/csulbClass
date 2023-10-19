
import './App.css'
import CoursesView from "./Components/CoursesComp/CoursesView.jsx";
import ClassSchedule from "./Components/ClassScheduleComp/ClassSchedule.jsx";
import NavBarLayout from "./Components/NavBarComp/NavBarLayout.jsx";
import {Route, Routes} from "react-router-dom";
import ProfessorReview from "./Components/ProfessorReviewComp/ProfessorReview.jsx";
import SearchScheduleUI from "./Components/SearchClassComp/SearchScheduleUI.jsx";
import ProfessorReviewUI from "./Components/SearchProfessorComp/ProfessorReviewUI.jsx";

function App() {

    return (
        <NavBarLayout>
            <Routes>
                <Route path={"/search/course"} element={<SearchScheduleUI />}></Route>
                <Route path={"/course/:courseID"} element={<ClassSchedule />}></Route>
                <Route path={"/"} element={<CoursesView />}></Route>
                <Route path={"/search/professor"} element={<ProfessorReviewUI />}></Route>
                <Route path={"/professor/:profID"} element={<ProfessorReview />}></Route>
            </Routes>
        </NavBarLayout>
    )
}

export default App
