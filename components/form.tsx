"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "../components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Form({ type }: { type: "login" | "register" }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                if (type === "login") {
                    signIn("credentials", {
                        redirect: false,
                        email: e.currentTarget.email.value,
                        password: e.currentTarget.password.value,
                        // @ts-ignore
                    }).then(({ error }) => {
                        if (error) {
                            setLoading(false);
                            toast.error(error);
                        } else {
                            router.refresh();
                            router.push("/");
                        }
                    });
                } else {
                    fetch("/api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: e.currentTarget.Name.value,
                            email: e.currentTarget.email.value,
                            password: e.currentTarget.password.value,
                        }),
                    }).then(async (res) => {
                        setLoading(false);
                        if (res.status === 200) {
                            toast.success("Data Submitted");
                            router.refresh();
                        } else {
                            const { error } = await res.json();
                            toast.error(error);
                        }
                    });
                }
            }}
            className="flex  flex-col space-y-4 p-5 sm:px-16"
        >
            {type === "register" ? (
                <div className="items-center justify-center mx-auto max-w ">
                    <div className="grid grid-cols sm:flex-row gap-2">
                        <div>
                            <label
                                htmlFor="first-name"
                                className="block text-xs text-white uppercase"
                            >
                                NAME
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="Name"
                                    id="Name"
                                    autoComplete="given-name"
                                    className="mt-1 block w-full bg-transparent rounded-md border  px-3 py-2  shadow-sm focus:border-white  focus:ring-white sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="last-name"
                                className="block text-xs text-white uppercase"
                            >
                                EMAIL
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autoComplete="family-name"
                                    className="mt-1 block w-full bg-transparent rounded-md border  px-3 py-2  shadow-sm focus:border-white  focus:ring-white sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="first-name"
                                className="block text-xs text-white uppercase"
                            >
                                PASSWORD
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="password"
                                    id="password"
                                    autoComplete="given-name"
                                    className="mt-1 block w-full bg-transparent rounded-md border  px-3 py-2  shadow-sm focus:border-white  focus:ring-white sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-5 ">
                            <button
                                disabled={loading}
                                className={`${
                                    loading
                                        ? "cursor-not-allowed border-gray-200 bg-gray-100"
                                        : "border-black bg-white text-black hover:bg-white hover:text-black"
                                } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
                            >
                                {loading ? <LoadingDots color="#808080" /> : <p>Sign Up</p>}
                            </button>
                            <div className="mt-2">
                            <Link href="/login" >You have Alredy an Account ? Sign In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <label
                            htmlFor="prnNumber"
                            className="block text-xs text-white uppercase"
                        >
                            EMAIL
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder=""
                            required
                            className="mt-1 block w-full bg-transparent rounded-md border  px-3 py-2  shadow-sm focus:border-white  focus:ring-white sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs text-white uppercase"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full appearance-none rounded-md border border-white px-3 py-2 bg-transparent shadow-sm focus:border-white  focus:ring-white sm:text-sm"
                        />
                    </div>
                    <button
                        disabled={loading}
                        className={`${
                            loading
                                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                                : "border-black bg-white text-black hover:bg-white hover:text-black"
                        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
                    >
                         {loading ? <LoadingDots color="#808080" /> : <p>Sign In</p>}
                    </button>
                    <div className="text-center">Dont have an Account? <Link href="/register"> Register Now</Link></div>
                </>
            )}
        </form>
    );
}
