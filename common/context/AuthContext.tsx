"use client";
import { checkIfWalletConnected } from "../utils/auth";
import { createContext, useState, useEffect, PropsWithChildren, SetStateAction, Dispatch } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext({
    isWalletConnected: false as boolean,
    setWalletConnected: (() => {}) as Dispatch<SetStateAction<boolean>>
});

const AuthContextProvider = (props: PropsWithChildren) => {
    const [isWalletConnected, setWalletConnected] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        checkIfWalletConnected().then(r => {
            setWalletConnected(r);
            setLoading(false);
            if (!r && pathname != "/Login") {
                router.push("/Login")
            } else if (r && pathname == "/Login") {
                router.push("/")
            }
        });
    }, [router, pathname]);
    
    return (
        <AuthContext.Provider value={{isWalletConnected, setWalletConnected}}>
            {isLoading == false && props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };
