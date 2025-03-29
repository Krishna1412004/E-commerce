'use client';

import { UserButton as ClerkUserButton, SignInButton, useUser } from "@clerk/nextjs";

export default function UserButton() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SignInButton mode="modal">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="flex justify-end p-4">
      <ClerkUserButton afterSignOutUrl="/" />
    </div>
  );
} 