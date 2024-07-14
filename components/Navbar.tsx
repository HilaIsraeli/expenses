import Link from "next/link";
import Image from "next/image";
import React from "react";
import AuthProviders from "./Authproviders";
import { getCurrentUser } from "@/app/lib/session";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flaxStart gap-10">
        <Link href="/">
          <h1>Expenses</h1>
        </Link>
        <div className="flex justify-end gap-4">
          {session?.user ? (
            <>
              <ProfileMenu session={session} />
              <Link href="/create-expense">Create Expense</Link>
            </>
          ) : (
            <AuthProviders />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
