
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search.js";
import {Button} from "@mui/joy";
import {useState} from "react";


function SearchInput({inputHandler}){

    const [SearchInput, setSearchInput] = useState('');

    const searchHandler = (event) => {
        event.preventDefault();

        inputHandler(SearchInput)

    }

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    }

    return (
        <form className={"flex"} onSubmit={searchHandler}>
            <Input
                placeholder="Search Classes (CECS 277)"
                size="md"
                variant="outlined"
                sx={{
                    width: "100%",
                    fontFamily: 'Poppins, sans-serif',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
                }}
                startDecorator={<SearchIcon />}
                value={SearchInput}
                onChange={handleInputChange}
            />

            <Button type="submit" size="md" sx={{backgroundColor: "black", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>Search</Button>
        </form>
    )

}


export default SearchInput;