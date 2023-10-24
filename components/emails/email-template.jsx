import Image from "next/image";
import * as React from "react";

export const EmailTemplate = ({ message, name }) => (
  <div>
    <h1> Request for Support </h1>
    {/* <Image
      src="/images/logo/logo-2.svg"
      alt="logo"
      width={140}
      height={30}
      className="w-full "
    /> */}

    <p>Dear {name}</p>

    <p>{message}</p>
  </div>
);
