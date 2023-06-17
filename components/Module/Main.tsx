"use client";
import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const Main = (props: PropsWithChildren) => {
    const { isWalletConnected } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();

    if (pathname != "/Login" && isWalletConnected == false) router.push("/Login");

    return (
        <main className="bg-black h-screen px-7 py-5 text-white">
            {props.children}
        </main>
    )
}  

export { Main };