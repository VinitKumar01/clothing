"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-14">
      <div
        className="flex items-center justify-center font-bold text-xl cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        Clothing
      </div>
      <div className="flex justify-end items-center p-4 gap-4 h-14">
        <ModeToggle />
        <SignedOut>
          <SignInButton>
            <Button className="cursor-pointer">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
