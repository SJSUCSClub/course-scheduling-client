'use client'
import { Input } from "@/components/ui/input"
import GoogleButton from "react-google-button";
export default function Home() {
  return (
    <div className="flex h-full w-full justify-center">
      <GoogleButton/>
      {/* <Input/> */}
    </div>
  );
}
