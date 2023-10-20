"use client";
import TimeAgoComponent from "@/components/Common/TimeAgo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Banknote, Bookmark, Clock2, Landmark, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

const AppliedJobContainer = ({ data }) => {
  const { resolvedTheme } = useTheme();
  const { toast } = useToast();
  return (
    <Card
      className={`mt-3 w-full ${
        resolvedTheme === "dark" ? "border-none" : ""
      } wow fadeInUp  rounded-md bg-primary/[10%] pt-3 pb-3  `}
    >
      <CardContent className="flex gap-3  flex-wrap">
        <Avatar className="w-20 h-20 rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <Link href={`/jobs/{data.id}`}>
            <h3
              className={`mb-4 text-2xl max-sm:font-normal  font-bold  leading-tight tracking-wider ${
                resolvedTheme === "dark" ? "text-primary" : "text-primary"
              }`}
            >
              {data?.jobId?.jobTitle}
            </h3>
          </Link>
          <div className="">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-primary-500 text-small-regular flex items-center gap-2">
                <Landmark />
                Oryx Energies Gambia Limited
              </span>
              <span className="flex items-center text-gray-500 text-small-regular ">
                <MapPin />
                {data?.jobId?.location} The Gambia
              </span>
              <span className="flex items-center text-secondary-500 text-small-semiboldr">
                <Bookmark />
                {data?.jobId?.jobType}
              </span>
            </div>

            <div className="py-5 max-md:hidden">
              <Label className="text-gray-600 ">Job Description</Label>
              <p className="text-gray-500  max-md:hidden text-small-semibold line-clamp-2">
                {data?.jobId?.description}
              </p>
            </div>

            <span className="flex items-center text-gray-500 text-small-regular w-full ">
              <Clock2 className="text-primary-500 pr-2" />
              <TimeAgoComponent time={data?.createdAt} />
            </span>
            <span className="flex items-center text-small-regular text-gray-500">
              <Banknote className="text-primary-500 pr-2" />
              {data?.jobId?.salary} / Monthly
            </span>
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center text-small-regular text-gray-500">
                Status :<span className="text-primary-500">{data?.status}</span>
              </span>
              {
                <Button className="flex items-center text-small-regular text-primary-500 bg-indigo-100 hover:bg-indigo-300">
                  {data?.jobId?.urgent === true ? "Urgent" : "Normal"}
                </Button>
              }
            </div>

            {/* send to a frend */}

            {/* full time  */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppliedJobContainer;
