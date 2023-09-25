
import NavBarUI from "./NavBarUI.jsx";

function NavBarLayout(props){

    return (
        <>
            <NavBarUI />
            {props.children}
        </>
    )

}


export default NavBarLayout;