"use client";
import { useState, useContext, Fragment, ChangeEvent } from "react";
import { UserContext } from "@/common/context/UserContext";
import Layout from "@/components/Module/Layout";
import PageHeader from "@/components/Module/PageHeader";
import GenreSelect from "@/components/GenreSelect";
import Notification from "../components/Notification";
import Link from "next/link";
import Library from "@/components/Library/Library";

export default function Home() {
    const [seletedGenre, setSelectedGenre] = useState<number>(0);
    const { userData } = useContext(UserContext)
    const { user } = userData
    const [isRegisterPromptOpen, setRegisterPromptOpen] = useState<boolean>(!user.isRegistered);

    const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(+e.target.value);
    }

    return (
        <Layout>
            <PageHeader title="Browse">
                <GenreSelect value={seletedGenre} onChange={handleGenreChange} allOption />
            </PageHeader>
            <Library genre={seletedGenre} />
            <Notification
                isOpen={isRegisterPromptOpen}
                setOpen={setRegisterPromptOpen}
            >   
                <p>
                    Please register to unlock the full services.&nbsp; 
                    <Link href="/Register" className="underline">Register</Link>
                </p>
            </Notification>
        </Layout>
    );
};
