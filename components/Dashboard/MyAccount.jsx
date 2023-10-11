"use client";
import React from "react";
import MyAccountData from "./myAccountData";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MyAccount = () => {
  const isEmployer = true; // Set this value based on whether the user is an employer or a candidate
  const pathname = usePathname();
  return (
    <section className="custom-scrollable">
      <div className="flex w-full flex-1 flex-col gap-10 px-6">
        {MyAccountData.map((link, index) =>
          (isEmployer && link.employear) || link.employear === "default" ? (
            <Link
              title={link.label}
              className={`flex items-center gap-4 pr-1 text-base font-medium text-body-color hover:text-primary cursor-pointer ${
                pathname === link.route ? "text-primary" : null
              }`}
              href={link.route}
              key={index}
            >
              {link.icone} {link.label}
            </Link>
          ) : (isEmployer === false && link.employear === false) ||
            link.employear === "default" ? (
            <Link
              title={link.label}
              className="flex items-center gap-4 pr-1 text-base font-medium text-body-color hover:text-primary cursor-pointer"
              href={link.route}
              key={index}
            >
              {link.icone} {link.label}
            </Link>
          ) : null
        )}
      </div>
    </section>
  );
};

export default MyAccount;
