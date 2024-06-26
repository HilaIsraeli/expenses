import Link from "next/link";
import Image from "next/image";
import React from "react";
import { NavLinks } from "@/constants";
import AuthProviders from "./Authproviders";
import { getCurrentUser } from "@/app/lib/session";
import { signOut } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flaxStart gap-10">
        <Link href="/">
          <h1>Expenses</h1>
          {/*
          <Image src="/logo.svg" width={115} height={42} alt="Expenses" />
  */}
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
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
