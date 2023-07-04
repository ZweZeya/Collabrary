import { Fragment, useState, useContext } from "react";
import { UserContext } from "@/common/context/UserContext";
import ProfileDropdown from "../ProfileDropdown";
import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";

const NavBar = () => {
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
    const { userData } = useContext(UserContext);
    const { user } = userData;

    const handleProfileDropdown = (state: boolean) => {
        if (user.isRegistered) {
            setProfileDropdownOpen(state);
        }
    };

    return (
        <Fragment>
            <div className="ml-auto flex items-center gap-5">
                {user.isRegistered &&
                    <div className="flex items-center">
                        <NavBarLink text="Add" href="/Add" />
                    </div>
                }
                <AiOutlineSetting 
                    className="cursor-pointer" 
                    size={30} 
                />
                <AiOutlineUser 
                    className="cursor-pointer" 
                    size={30} 
                    onMouseEnter={() => handleProfileDropdown(true)}
                    onMouseLeave={() => handleProfileDropdown(false)} 
                />
            </div>
            {/* <ProfileDropdown 
                isOpen={isProfileDropdownOpen} 
                setOpen={setProfileDropdownOpen}
                userData={userData}
            /> */}
        </Fragment>
    )
}

const NavBarLink = ({text, href}: {text: string, href: string}) => {
    return (
        <Link href={href} className="text-lg">
            <p>{text}</p>
        </Link>
    )
}

export default NavBar;