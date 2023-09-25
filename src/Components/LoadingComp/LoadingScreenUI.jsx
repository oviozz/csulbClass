
import LinearProgress from '@mui/material/LinearProgress';
import {Alert, CircularProgress} from "@mui/joy";
import "./LoadingScreenUI.css"

function LoadingScreenUI({titleVal}) {
    return (
        <div>
            <LinearProgress color="inherit" />

            <div className="flex flex-col justify-center items-center h-[calc(100vh-72px)] pointer-events-none">
                <CircularProgress color={"neutral"} size={"md"} value={50}/>
                <div className="text-yellow-500 text-3xl lg:text-4xl font-bold mt-4 flex">
                    Getting {titleVal} Data
                    <div className={"dot"}>
                        <span className="dot-animation"></span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LoadingScreenUI;
