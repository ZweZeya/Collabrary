"use client";
import { PropsWithChildren, createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import loadContract from  "../utils/collabrary";

const CollabraryContext = createContext({
    collabraryContract: {} as any,
    setCollabraryContract: (() => {}) as Dispatch<SetStateAction<any>>
});

const CollabraryContextProvider = (props: PropsWithChildren) => {
    const [collabraryContract, setCollabraryContract] = useState<any>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const pathname = usePathname()

    useEffect(() => {
        if (pathname != "/Login") {
            loadContract().then(r => {
                setCollabraryContract(r);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [pathname])

    return (
        <CollabraryContext.Provider value={{ collabraryContract, setCollabraryContract }}>
            { isLoading == false && props.children }
        </CollabraryContext.Provider>
    )
}

export { CollabraryContext, CollabraryContextProvider };