"use client";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (
        !state.email ||
        !state.password ||
        !state.name ||
        state.email == "" ||
        state.password == "" ||
        state.name == ""
      ) {
        toast.error("please fill all fields");
      }
      const response = await axios.post("/api/register", state);
      const data = await response.data;
      toast.success(data.msg);
      setState({
        name: "",
        email: "",
        password: "",
      });
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      setState({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <>
      <section className="text-white pt-16 h-screen bg-zinc-900 body-font">
        <div className="container px-5 py-12 mx-auto flex flex-wrap items-center">
          <form
            onSubmit={onSubmitHandler}
            className=" xl:w-1/3 sm:w-[75%] lg:w-[50%] bg-zinc-600 rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0"
          >
            <h2 className="text-white text-xl text-center font-medium title-font mb-5">
              REGISTER
            </h2>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-white">
                Enter Your Name
              </label>
              <input
                onChange={onChangeHandler}
                value={state.name}
                type="text"
                id="name"
                name="name"
                placeholder="Pawan Rai"
                className="w-full bg-zinc-500 rounded border border-zinc-900  focus:ring-2 focus:ring-zinc-100 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
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
                placeholder="info@example.com"
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
                placeholder="********"
                className="w-full bg-zinc-500 rounded border border-zinc-900  focus:ring-2 focus:ring-zinc-100 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-400 rounded text-lg">
              Register
            </button>
            <p className="text-sm text-white mt-3">
              Already have an account ?{" "}
              <Link className="text-blue-500" href={"/login"}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
