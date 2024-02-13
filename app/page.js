'use client'
import { Input } from "@/components/ui/input";
import Login from "@/components/login";
import { SessionProvider } from "next-auth/react";
export default function Home() {
  return (
    <div className="flex h-full w-full justify-center">
      <SessionProvider>
        <Login/>
      </SessionProvider> 
      {/* <Input/> */}
    </div>
  );
}
