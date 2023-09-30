

import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search.js";
import {Button} from "@mui/joy";
import {useState} from "react";


function ProfessorSearchInput({inputHandler}){

    const [ProfSearchInput, setProfSearchInput] = useState('');

    const searchHandler = (event) => {
        event.preventDefault();

        inputHandler(ProfSearchInput)

    }

    const handleInputChange = (event) => {
        setProfSearchInput(event.target.value);
    }

    return (
        <form className={"flex"} onSubmit={searchHandler}>
            <Input
                placeholder="Search Professor (Gold Steve)"
                size="md"
                variant="outlined"
                sx={{
                    width: "100%",
                    fontFamily: 'Poppins, sans-serif',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
                }}
                startDecorator={<SearchIcon />}
                value={ProfSearchInput}
                onChange={handleInputChange}
            />

            <Button type="submit" size="md" sx={{backgroundColor: "black", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>Search</Button>
        </form>
    )

}


export default ProfessorSearchInput;