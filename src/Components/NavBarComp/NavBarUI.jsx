
import NavBarListsUI from "./NavBarListsUI.jsx";
import NavBarLogo from "./NavBarLogo.jsx";
import YearSeasonDropdown from "./YearSeasonDropdown.jsx";

function NavBarUI(){

    return (
        <div className={"flex justify-between items-center bg-white py-4 px-4"}>
            <NavBarLogo />
            <section className={"sm:block hidden"}>
                <YearSeasonDropdown />
            </section>
            <NavBarListsUI />
        </div>
    )


}


export default NavBarUI;