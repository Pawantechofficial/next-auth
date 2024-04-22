"use client";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (
        !state.email ||
        !state.password ||
        state.email == "" ||
        state.password == ""
      ) {
        toast.error("please fill all fields");
      }
      const response = await axios.post("/api/login", state);
      const data = await response.data;
      toast.success(data.msg);
      router.push("/profile");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <>
      <section className="text-white pt-16 h-screen justify-center items-center bg-zinc-900 body-font">
        <div className="container px-5 py-12 mx-auto flex flex-wrap items-center">
          <form
            onSubmit={onSubmitHandler}
            className=" xl:w-1/3 sm:w-[75%] lg:w-[50%] bg-zinc-600 rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0"
          >
            <h2 className="text-white text-xl text-center font-medium title-font mb-5">
              SIGN-IN
            </h2>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-white">
                Email
              </label>
              <input
                onChange={onChangeHandler}
                value={state.email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-zinc-500 rounded border border-zinc-900  focus:ring-2 focus:ring-zinc-100 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-white"
              >
                Password
              </label>
              <input
                onChange={onChangeHandler}
                value={state.password}
                type="password"
                id="password"
                name="password"
                className="w-full bg-zinc-500 rounded border border-zinc-900  focus:ring-2 focus:ring-zinc-100 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-400 rounded text-lg">
              Login
            </button>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-white mt-3">
                Not have an account ?{" "}
                <Link className="hover:text-blue-500" href={"/register"}>
                  Register
                </Link>
              </p>

              <p className="text-sm text-white mt-3 hover:text-blue-600">
                <Link href={"/forget-password"}>Forget Password</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
