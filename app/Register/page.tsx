"use client";
import { ChangeEvent, useState, useContext, useReducer } from "react";
import Layout from "@/components/Module/Layout";
import PageHeader from "@/components/Module/PageHeader";
import { type User } from "@/common/utils/types";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { UserContext } from "@/common/context/UserContext";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const [newUser, setNewUser] = useState<User>({
        username: "",
        firstName: "",
        lastName: "",
        email: ""
    });

    const { userData } = useContext(UserContext);
    const router = useRouter();

    if (userData.isRegistered) {
        router.push("/");
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUser(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleRegisterClick = () => {
        
    };

    return (
        <Layout>
            <PageHeader title="Register"></PageHeader>
            <div className="flex justify-center">
                <form className="flex flex-col gap-3 bg-indigo-100 items-center px-3 py-3 rounded-md">
                    <TextInput 
                        name="username"
                        value={newUser.username}
                        onChange={handleInputChange}
                        label="Username"
                        placeHolder="john_doe"
                    />
                    <TextInput 
                        name="firstName"
                        value={newUser.firstName}
                        onChange={handleInputChange}
                        label="First Name"
                        placeHolder="John"
                    />
                    <TextInput 
                        name="lastName"
                        value={newUser.lastName}
                        onChange={handleInputChange}
                        label="Last Name"
                        placeHolder="Doe"
                    />
                    <TextInput 
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        label="Email"
                        placeHolder="@example.com"
                    />
                    <Button onClick={handleRegisterClick} className="bg-sky-50 hover:bg-sky-200">Register</Button>
                </form>
            </div>
        </Layout>
    )
}

export default RegisterPage;