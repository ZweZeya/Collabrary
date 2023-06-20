"use client";
import { load } from "../utils/auth";
import { createContext, useState, useEffect, PropsWithChildren, SetStateAction, Dispatch } from "react";
import { usePathname } from "next/navigation";
import { type UserData } from "../utils/types";

const UserContext = createContext({
    userData: {} as UserData,
    setUserData: (() => {}) as Dispatch<SetStateAction<UserData>>
});

const UserContextProvider = (props: PropsWithChildren) => {
    const [userData, setUserData] = useState<UserData>({} as UserData);
    const [isLoading, setLoading] = useState<boolean>(true);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname != "Login") {
            load().then(r => {
                setUserData(r);
                setLoading(false);
            });
        }
    }, [pathname]);

    console.log(userData);
    
    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {isLoading == false && props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };