"use client"
import { NextPage } from "next";
import { load } from "../../common/utils/auth";
import { useRouter } from "next/navigation";
import { BsWallet2 } from "react-icons/bs";
import Layout from "@/components/Module/Layout";

const LoginPage: NextPage = () => {
    const router = useRouter();

    const handleLogin = () => {
        load().then(r => {
            router.push("/");
        });
    }

    return (
        <Layout>
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
        </Layout>
    )
}

export default LoginPage;