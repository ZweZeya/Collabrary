"use client";
import { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { AiOutlineUser } from "react-icons/ai";
import { UserContext } from "@/common/context/UserContext";

const TopBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { userData } = useContext(UserContext);

    const handleLogoClick = () => {
        if (pathname != "/") router.push("/");
    }

    return (
        <div className="flex items-center gap-2 bg-blue-600 text-sky-50 py-3 px-4">
            <div 
                className="flex items-center cursor-pointer"
                onClick={handleLogoClick}
            >
                <Logo />
                <p className="text-xl">Collabrary</p>
            </div>
            {pathname != "/Login" && 
                <AiOutlineUser className="ml-auto" size={40} />
            }
        </div>
    )
}

export default TopBar;