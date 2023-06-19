"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Module/Layout";
import PageHeader from "@/components/Module/PageHeader";
import GenreSelect from "@/components/GenreSelect";
import Notification from "../components/Notification";
import Link from "next/link";

export default function Home() {
    const [seletedGenre, setSelectedGenre] = useState<number>(0);
    const [isTooltipOpen, setTooltipOpen] = useState<boolean>(true);
    


    return (
        <Layout>
            <PageHeader title="Browse">
                <GenreSelect value={seletedGenre} setValue={setSelectedGenre} />
                <Notification
                    isOpen={isTooltipOpen}
                    setOpen={setTooltipOpen}
                >   
                    <p>
                        Please register to unlock the full services.&nbsp; 
                        <Link href="/Register" className="underline">Register</Link>
                    </p>
                </Notification>
            </PageHeader>
        </Layout>
    )
}
