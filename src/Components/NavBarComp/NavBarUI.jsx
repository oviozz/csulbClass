
import NavBarListsUI from "./NavBarListsUI.jsx";
import NavBarLogo from "./NavBarLogo.jsx";

function NavBarUI(){

    return (
        <div className={"flex justify-between items-center bg-white py-4 px-4"}>
            <NavBarLogo />
            <NavBarListsUI />
        </div>
    )


}


export default NavBarUI;