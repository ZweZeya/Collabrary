"use client"
import { useState, useEffect, Fragment } from "react";
import { NextPage } from "next";
import { load, checkIfWalletConnected } from "../../common/utils/auth";
import { useRouter } from "next/navigation";
import { BsWallet2 } from "react-icons/bs";
import Layout from "@/components/Module/Layout";

const LoginPage: NextPage = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        checkIfWalletConnected().then(r => {
            if (r) router.push("/");
            else setLoading(false);
        })
    }, [router])

    const handleLogin = () => {
        load().then(r => {
            router.refresh();
        });
    }

    return (
        <Layout>
            {!isLoading && 
            <Fragment>
                <div className="flex flex-col items-center gap-5 justify-center">
                    <p className="text-6xl font-medium">A Shared Library on the Blockchain</p>
                    <div className="rounded-lg bg-slate-200 flex flex-col items-center gap-4 py-3 px-3 absolute top-1/3">
                        <p className="text-black text-4xl font-medium">Login</p>
                        <button 
                            className="rounded-full bg-sky-500 px-4 py-1 flex items-center gap-2 hover:bg-sky-600 text-white"
                            onClick={handleLogin}
                        ><BsWallet2 /> Connect Wallet</button>
                    </div>
                </div>
            </Fragment>
            }
        </Layout>
    )
}

export default LoginPage;