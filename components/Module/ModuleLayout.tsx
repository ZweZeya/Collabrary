"use client";
import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const ModuleLayout = (props: PropsWithChildren) => {
    const { isWalletConnected } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();

    if (isWalletConnected == false) router.push("/Login");

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {props.children}
        </main>
    )
}  

export default ModuleLayout