"use client";
import Button from "@/components/atom/button";
import Logo from "@/components/atom/logo";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { HiMenu } from "react-icons/hi";

interface HeaderProps {
  isHomePage: boolean;
  isLoggedIn: boolean; // Prop to indicate if the user is logged in or not
}

const Header: React.FC<HeaderProps> = ({ isHomePage, isLoggedIn }) => {
  return (
    <div className="container py-[1em] flex items-center justify-between">
      <div className="flex gap-[5em]">
        <Logo />
        <nav>
          <ul className="hidden lg:flex gap-4 list-none">
            <li>Explore</li>
            <li>About Us</li>
          </ul>
        </nav>
      </div>

      <div className="hidden lg:flex items-center justify-center gap-5">
        {!isLoggedIn ? (
          <>
            <Button width="w-[178px]" onClick={() => signIn()}>
              {isHomePage ? "Login" : "LogOut"}
            </Button>
            {isHomePage && (
              <Button width="w-[178px]" onClick={() => signIn()}>
                SignIn
              </Button>
            )}
          </>
        ) : (
          <Button width="w-[178px]" onClick={() => signOut()}>
            LogOut
          </Button>
        )}
      </div>

      {/* Display for mobile */}
      <div className="block lg:hidden">
        <HiMenu size="1.5em" />
      </div>
    </div>
  );
};

export default Header;
