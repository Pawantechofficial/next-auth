"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [user, setUser] = useState<{ name?: string; email?: string }>({});
  const router = useRouter();
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/profile");
      const data = await response.data?.user;
      setUser(data);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const logOutUser = async () => {
    try {
      const { data } = await axios.get("/api/logout");
      // const data = await response.data?.user;
      toast.success(data.msg);
      setUser({});
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen bg-zinc-900 pt-20 flex-col items-center justify-between p-12">
      <div className="card border p-4 text-whitep-5 shadow text-2xl gap-y-4">
        <h1 className="text-white">Name: {user && user.name}</h1>
        <h1 className="text-white">Email: {user && user.email}</h1>
        <button
          onClick={logOutUser}
          className="px-4 py-2 rounded-lg text-sm text-white bg-indigo-500"
        >
          LogOut
        </button>
      </div>
    </main>
  );
}
