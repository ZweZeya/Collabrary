"use client";
import { useContext, useEffect } from "react";
import { CollabraryContext } from "@/common/context/CollabraryContext";

const Library = () => {
    const { collabraryContract } = useContext(CollabraryContext);

    useEffect(() => {
        
    }, [])

    return (
        <div>

        </div>
    );
};

export default Library;