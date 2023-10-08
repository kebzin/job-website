"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import Link from "next/link";
import TimeAgo from "react-timeago";
import { Clock2, Landmark, MapPin } from "lucide-react";
const RenderCompany = ({ data }) => {
  const { resolvedTheme } = useTheme();
  return (
    <Card
      className={`mt-3 w-full ${
        resolvedTheme === "dark" ? "border-none" : ""
      } wow fadeInUp  rounded-md bg-primary/[10%] p-5  `}
    >
      <CardContent className="flex gap-3 py-5  flex-wrap">
        <Avatar className="w-20 h-20 rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <Link href={`/company/${data?._id}`}>
            <h3
              className={`mb-4 text-2xl font-bold leading-tight tracking-wider ${
                resolvedTheme === "dark" ? "text-primary" : "text-primary"
              }`}
            >
              {data?.companyName}
            </h3>
          </Link>
          <div className="">
            <span className="text-primary-500 text-small-regular flex items-center gap-2">
              <Landmark />
              {data?.industry}
            </span>

            <span className="flex items-center text-gray-500 text-small-regular mt-4 ">
              <MapPin />
              {data?.companyAddress} The Gambia
            </span>

            <span className="flex items-center text-gray-500 text-small-regular w-full ">
              <Clock2 className="text-primary-500 pr-2" />{" "}
              <i className="mr-2">Join At</i>
              <TimeAgo date={data?.createdAt} />
            </span>
            <span className="flex items-center text-gray-500 text-small-regular w-full ">
              <Clock2 className="text-primary-500 pr-2" />
              {/* <TimeAgo date={data?.createdAt} /> */}Poted 2 jobs
            </span>

            {/* send to a frend */}
            <Button className="w-full">
              <Link href={`/company/${data?._id}`}>View Company</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RenderCompany;
