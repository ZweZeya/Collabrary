"use client"
import { useState, useEffect } from "react";
import { NextPage } from "next";
import { load, checkIfWalletConnected } from "../../utils/auth";
import "./page.css";
import { useRouter } from "next/navigation";

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
            router.push("/");
        });
    }

    return (
        <main>
            {!isLoading && 
                <div>
                    <h3>Login</h3>
                    <button onClick={handleLogin}>Connect</button>
                </div>
            }
        </main>
    )
}

export default LoginPage;