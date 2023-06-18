"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Module/Layout";
import { load } from "../common/utils/auth";
import PageHeader from "@/components/Module/PageHeader";
import GenreSelect from "@/components/GenreSelect";

export default function Home() {
    const [seletedGenre, setSelectedGenre] = useState<number>(0);

    useEffect(() => {
        load().then(r => {
            console.log(r)
        })
    }, [])
  
    return (
        <Layout>
            <PageHeader title="Browse">
                <GenreSelect value={seletedGenre} setValue={setSelectedGenre} />
            </PageHeader>
        </Layout>
    )
}
