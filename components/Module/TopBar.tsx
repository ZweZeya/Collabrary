"use client";
import { Fragment, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { AiOutlineUser } from "react-icons/ai";
import { UserContext } from "@/common/context/UserContext";
import ProfileDropdown from "../ProfileDropdown";

const TopBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { userData } = useContext(UserContext);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);

    const handleLogoClick = () => {
        if (pathname != "/" && pathname != "/Login") router.push("/");
    }

    const handleProfileDropdown = (state: boolean) => {
        if (userData.isRegistered) {
            setProfileDropdownOpen(state);
        }
    };

    return (
        <Fragment>
            <div className="flex items-center gap-2 bg-blue-600 text-sky-50 py-3 px-4">
                <div 
                    className="flex items-center cursor-pointer"
                    onClick={handleLogoClick}
                >
                    <Logo />
                    <p className="text-xl">Collabrary</p>
                </div>
                {pathname != "/Login" && 
                    <AiOutlineUser 
                        className="ml-auto cursor-pointer" 
                        size={40} 
                        onMouseEnter={() => handleProfileDropdown(true)}
                        onMouseLeave={() => handleProfileDropdown(false)} 
                    />
                }
            </div>
            <ProfileDropdown 
                isOpen={isProfileDropdownOpen} 
                setOpen={setProfileDropdownOpen}
                userData={userData}
            />
        </Fragment>
    )
}

export default TopBar;