"use client";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import NavBar from "./NavBar";

const TopBar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogoClick = () => {
        if (pathname != "/" && pathname != "/Login") router.push("/");
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
                <NavBar />
            }
        </div>
    )
}

export default TopBar;