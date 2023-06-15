"use client"
import { NextPage } from "next";
import { connectWallet, checkIfWalletConnected } from "../../utils/auth";
import "./page.css";

const LoginPage: NextPage = () => {
    return (
        <main>
            <div>
                <h3>Login</h3>
                <button onClick={connectWallet}>Connect</button>
                <button onClick={checkIfWalletConnected}>Check account</button>
            </div>
        </main>
    )
}

export default LoginPage;