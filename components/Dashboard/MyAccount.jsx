"use client";
import React, { useState, useTransition } from "react";
import MyAccountData from "./myAccountData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { updateOffeser } from "@/lib/actions/userAction";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { Switch } from "../ui/switch";
import { CardDescription } from "../ui/card";

const MyAccount = ({ handleclosed }) => {
  const { data: session } = useSession();
  const isEmployer = session?.user?.role === "Employear" ? true : false; // Set this value based on whether the user is an employer or a candidate
  const [switchValue, setSwitchValue] = useState(isEmployer);
  console.log(isEmployer);
  const [ispending, startTransition] = useTransition();
  // hooks
  const { toast } = useToast();

  const HandleAccountSwitch = async () => {
    try {
      const user = {
        role: session?.user?.role === "Candidate" ? "Employear" : "Candidate",
      };
      const result = await updateOffeser({ user, id: session?.user.id });
      if (result.status === 200) {
        toast({
          variant: "",
          title: "Succesfully Switched",
          description: ` Account Succesfully switched. ${result.message}`,
        });

        setTimeout(() => {
          toast({
            variant: "",
            title: "Sign Out triggered",
            description: `For security reasons, you have been signed out due to an account switch. You can sign back in using your email and password."`,
          });
        }, 3500);

        setTimeout(async () => {
          await signOut();
        }, 10000);
      } else {
        return toast({
          variant: "destructive",
          title: "Uh oh! something went Wrong   .",
          description: `An Error Occured. Error${result.message}`,
          action: (
            <ToastAction onClick={() => signIn()} altText="Log In">
              Log In
            </ToastAction>
          ),
        });
      }
    } catch (error) {
      console.log("Error in account switch", error?.message || "unknown");
      toast({
        variant: "destructive",
        title: "Uh oh! something went wrong  .",
        description: `Error in account switching ${error.message}`,
      });
    }
  };

  const pathname = usePathname();
  return (
    <section className="custom-scrollable">
      <div className="flex w-full flex-1 flex-col gap-10 px-6">
        {MyAccountData.map((link, index) =>
          (isEmployer && link.employear) || link.employear === "default" ? (
            <Link
              onClick={() => {
                handleclosed === undefined ? null : handleclosed(false);
              }}
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
              onClick={() => {
                handleclosed === undefined ? null : handleclosed(false);
              }}
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
      <div className="flex   flex-col gap-2 mt-5 ">
        <div className="flex items-center gap-2 ml-5">
          <Switch
            checked={switchValue}
            id="airplane-mode"
            className=""
            onCheckedChange={() =>
              startTransition(() => {
                setSwitchValue((prev) => !prev), HandleAccountSwitch();
              })
            }
          />
          <CardDescription>
            {" "}
            {ispending === true ? "Processing" : "Switch Account"}{" "}
          </CardDescription>
        </div>
        <Button className=" ml-4 mr-4" clas onClick={() => signOut()}>
          {" "}
          <LogOut /> Sign Out
        </Button>
      </div>
    </section>
  );
};

export default MyAccount;
