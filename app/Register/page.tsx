"use client";
import { ChangeEvent, useState, useContext, FormEvent } from "react";
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
    const [errorMsg, setErrorMsg] = useState<string>();
    const { userData } = useContext(UserContext);
    const { AuthContract, userAddress } = userData
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

    const validateEmail = (email: string): boolean => {
        const emailRegex = new RegExp("\\w+\\@\w+\\.\\S+");
        return emailRegex.test(email);
    };

    const isFormComplete = (data: User): boolean => {
        for (const field in data) {
            if (data[field as keyof User] === "") return false
        }
        return true;
    }

    const handleRegisterClick = async (e: FormEvent) => {
        e.preventDefault();
        const { 
            username,
            firstName,
            lastName,
            email
        } = newUser;

        if (!isFormComplete(newUser)) {
            setErrorMsg("Please fill in all the required fields.");
        } else if (!validateEmail(email)) {
            setErrorMsg("Please provide a valid email address.");
        } else {
            // await AuthContract.register(username, firstName, lastName, email, {from: userAddress});
            // router.push("/");
        }
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
                    { errorMsg && 
                        <p className="text-red-700">{errorMsg}</p>
                    }
                </form>
            </div>
        </Layout>
    )
}

export default RegisterPage;