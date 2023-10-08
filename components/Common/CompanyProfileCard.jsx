import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Hourglass,
  Instagram,
  Landmark,
  Linkedin,
  MailOpen,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const CompanyProfileCard = ({ data }) => {
  return (
    <div className=" bg-primary/[20%] py-5 px-7 rounded-md min-w-max  w-full">
      <h3 className="text-heading4-medium pb-10">Company Profile</h3>
      <div className="flex gap-2">
        <Avatar className="w-20 h-20 rounded-md">
          <AvatarImage
            width={50}
            height={50}
            src="https://github.com/shadcn.pngg"
          />
          <AvatarFallback className="bg-red-400 rounded-md">
            {data?.companyName?.charAt(0) + data?.companyName?.charAt(1)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h3>{data?.industry}</h3>
          <Link href={"/"} className="text-primary-500">
            Company Profile
          </Link>
        </div>
      </div>

      {/* details */}
      <div className="py-5 flex  flex-col gap-9">
        <div className="flex items-center gap-2 justify-between">
          <p className="text-base1-semibold  flex items-center gap-1">
            <Landmark className="text-primary-500" /> Primary industry:{" "}
          </p>
          <p className="text-gray-500 text-small-semibold">{data?.industry}</p>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <p className="text-base1-semibold flex items-center gap-1">
            {" "}
            <Hourglass className="text-primary-500" />
            Company size:{" "}
          </p>{" "}
          <p className="text-gray-500 text-small-semibold">501-1,000</p>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <p className="text-base1-semibold flex items-center gap-1">
            {" "}
            <Phone className="text-primary-500" />
            Phone:{" "}
          </p>{" "}
          <p className="text-gray-500 text-small-semibold">
            {data?.companyPhoneNumber}
          </p>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <p className="text-base1-semibold flex items-center gap-1">
            {" "}
            <MailOpen className="text-primary-500" />
            Email:{" "}
          </p>{" "}
          <p className="text-gray-500 text-small-semibold">
            {data?.companyEmail}
          </p>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <p className="text-base1-semibold flex items-center gap-1">
            {" "}
            <MapPin className="text-primary-500" />
            Location:{" "}
          </p>{" "}
          <p className="text-gray-500 text-small-semibold">
            {data?.companyAddress}
          </p>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <p className="text-base1-semibold flex items-center gap-1">
            {" "}
            <Hourglass className="text-primary-500" />
            Social media:
          </p>{" "}
          <div className="flex items-center gap-1">
            <Link
              className="text-small-regular text-primary-500"
              href={data?.facebook || "/"}
            >
              <Facebook />
            </Link>
            <Link
              className="text-small-regular text-primary-500"
              href={data?.instagram || "/"}
            >
              <Instagram />
            </Link>
            <Link
              className="text-small-regular text-primary-500"
              href={data?.linkedin || "/"}
            >
              <Linkedin />
            </Link>
            <Link
              className="text-small-regular text-primary-500"
              href={data?.twitter || "/"}
            >
              <Twitter />
            </Link>
          </div>
        </div>

        <Button className="text-primary-500 py-7 bg-primary/30 hover:bg-indigo-400">
          <Link href={data?.companyWebsite || "/"}>{data?.companyWebsite}</Link>
        </Button>
      </div>
    </div>
  );
};

export default CompanyProfileCard;
