
import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Menu from '@mui/icons-material/Menu';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import "./NavBarListsUI.css"
import { FaRectangleList, FaMoon, FaSun } from "react-icons/fa6";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from 'react-router-dom'


export default function NavBarListsUI() {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [darkTheme, setdarkTheme] = useState(false)

    const handleToggleDrawer = () => {
        setOpen(!open);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };

    const toggleTheme = () => {
        setdarkTheme(prevState => !prevState)
    };

    useEffect(() => {
        document.body.style.backgroundColor = darkTheme ? 'white' : '#FFC72A'; // Change 'blue' to your desired color
    }, [darkTheme]);

    useEffect(() => {
        const updateWindowWidth = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', updateWindowWidth);

        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);

    return (
        <React.Fragment>
            {isMobile && (
                <IconButton variant="outlined" color="neutral" onClick={handleToggleDrawer}>
                    <Menu />
                </IconButton>
            )}
            {isMobile && (
                <Drawer open={open} onClose={handleCloseDrawer}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            ml: 'auto',
                            mt: 1,
                            mr: 1,
                        }}
                    >
                        <Typography
                            component="label"
                            htmlFor="close-icon"
                            fontSize="sm"
                            fontWeight="lg"
                            sx={{ cursor: 'pointer' }}
                        >
                            <h1 style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>close</h1>
                        </Typography>
                        <ModalClose id="close-icon" sx={{ position: 'initial' }} />
                    </Box>
                    <List
                        size="lg"
                        component="nav"
                        sx={{
                            flex: 'none',
                            mt: 3,
                            '& > div': { justifyContent: 'flex-start' }, // Align text to the left
                        }}
                    >
                        <Link to={"/"}>
                            <ListItemButton onClick={handleCloseDrawer} style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif', justifyContent: 'flex-start' }}>
                                <SearchRoundedIcon /> Find Classes
                            </ListItemButton>
                        </Link>

                        <Link to={"/course"}>
                            <ListItemButton onClick={handleCloseDrawer} style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif', justifyContent: 'flex-start', gap: "3px" }}>
                                <FaRectangleList fontSize={21} /> Courses
                            </ListItemButton>
                        </Link>

                        <li className={"mt-2 ml-4"} onClick={toggleTheme} style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif', justifyContent: 'flex-start', gap: "3px" }}>
                            {
                                darkTheme ?
                                    <div className={"flex gap-1"}>
                                        <FaMoon fontSize={23}/>
                                        Dark
                                    </div>
                                    :
                                    <div className={"flex gap-1.5"}>
                                        <FaSun fontSize={23}/>
                                        Light
                                    </div>
                            }
                        </li>
                    </List>
                </Drawer>
            )}
            {!isMobile && (
                <ul className={"flex gap-5"}>
                    <Link to={"/"}>
                        <li className={"navbar--links flex items-center "}>
                            <SearchRoundedIcon /> Find Classes
                        </li>
                    </Link>

                    <Link to={"/course"}>
                        <li className={"navbar--links gap-1 flex items-center"}>
                            <FaRectangleList fontSize={21} /> Courses
                        </li>
                    </Link>

                    <li onClick={toggleTheme} className={"hover:cursor-pointer"}>
                        {
                            darkTheme ?
                                <DarkModeIcon fontSize={"medium"}/>
                                :
                                <LightModeIcon fontSize={"medium"}/>
                        }
                    </li>
                </ul>
            )}
        </React.Fragment>
    );
}
