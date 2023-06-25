"use client";
import { useState, useContext, Fragment } from "react";
import { UserContext } from "@/common/context/UserContext";
import Layout from "@/components/Module/Layout";
import PageHeader from "@/components/Module/PageHeader";
import GenreSelect from "@/components/GenreSelect";
import Notification from "../components/Notification";
import Link from "next/link";

export default function Home() {
    const [seletedGenre, setSelectedGenre] = useState<number>(0);
    const { userData } = useContext(UserContext)
    const [isRegisterPromptOpen, setRegisterPromptOpen] = useState<boolean>(!userData.isRegistered);

    return (
        <Fragment>
            <Layout>
                <PageHeader title="Browse">
                    <GenreSelect value={seletedGenre} setValue={setSelectedGenre} />
                </PageHeader>
            </Layout>

            <Notification
                isOpen={isRegisterPromptOpen}
                setOpen={setRegisterPromptOpen}
            >   
                <p>
                    Please register to unlock the full services.&nbsp; 
                    <Link href="/Register" className="underline">Register</Link>
                </p>
            </Notification>
    </Fragment>
    )
}
