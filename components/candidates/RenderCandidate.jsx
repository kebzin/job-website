"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import Link from "next/link";
import TimeAgo from "react-timeago";
import { Clock2, Landmark, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import PresetActions from "../Common/DeleteAction";
const RenderCandidate = ({ viewingApplicant, data, circleName }) => {
  const { resolvedTheme } = useTheme();
  console.log(circleName);

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
          <Link href={`/candidates/${data._id}`}>
            <h3
              className={`mb-4 text-2xl font-bold leading-tight tracking-wider ${
                resolvedTheme === "dark" ? "text-primary" : "text-primary"
              }`}
            >
              {data?.FirstName + " " + data?.LastName}
            </h3>
          </Link>
          <div className="w-full">
            <span className="text-primary-500 text-small-regular flex items-center gap-2">
              <Landmark />
              {"Software Development"}
            </span>

            <span className="flex items-center text-gray-500 text-small-regular mt-4 ">
              <MapPin />
              {data?.location} The Gambia
            </span>

            <span className="flex items-center text-gray-500 text-small-regular w-full ">
              <Clock2 className="text-primary-500 pr-2" />{" "}
              <i className="mr-2">Join At</i>
              <TimeAgo date={data?.createdAt} />
            </span>
          </div>

          {/* send to a frend */}
          <div className="flex  gap-2 flex-wrap items-center mt-3">
            {viewingApplicant === true ? null : (
              <Button className="">
                <Link href={`/candidates/${data._id}`}>View profile</Link>
              </Button>
            )}

            {viewingApplicant && (
              <>
                <Button>Resumea </Button>
                <PresetActions
                  PressActionButton={"Reject "}
                  dialogTitle={"Reject Application"}
                  dialogMessage={
                    "This Individual Application will be Rejected. But if you change your minde later Your can Short list or approve this application "
                  }
                />
                <Button className="bg-primary/30">Approver Applicnt </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RenderCandidate;
