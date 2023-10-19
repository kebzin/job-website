"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import Link from "next/link";
import TimeAgo from "react-timeago";
import {
  Banknote,
  Bookmark,
  Clock2,
  FileEdit,
  Landmark,
  MapPin,
  SendHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import PresetActions from "@/components/Common/DeleteAction";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteJob } from "@/lib/actions/jobeAction";

const ManageJobeCard = ({ job, id, company }) => {
  const { resolvedTheme } = useTheme();

  const { toast } = useToast();

  const HandleJobDelete = async (id) => {
    const response = await DeleteJob({ id });
    if (response.status === 200) {
      toast({
        variant: "destructive",
        title: "Job Deleted",
        description: response?.message,
      });
    }
  };
  return (
    <Card
      className={`mt-3 w-full relative ${
        resolvedTheme === "dark" ? "border-none" : ""
      } wow fadeInUp  rounded-md bg-primary/[10%] p-5  `}
    >
      <CardContent className="flex gap-3 py-5  flex-wrap">
        <Avatar className="w-20 h-20 rounded-md">
          <AvatarImage src="https://github.com/kebzing.png" />
          <AvatarFallback>
            {company?.companyName?.charAt(0) +
              company?.companyName?.slice(" ")[1].charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="">
          <Link href={`/jobs/${job?._id}`}>
            <h3
              className={`mb-4 text-2xl  ${
                resolvedTheme === "dark" ? "text-primary" : "text-primary"
              }`}
            >
              {job?.jobTitle}
            </h3>
          </Link>
          <div className="relative">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-primary-500 text-small-regular flex items-center gap-2">
                <Landmark />
                {company?.companyName}
              </span>
              <span className="flex items-center text-gray-500 text-small-regular ">
                <MapPin />
                {job?.location} The Gambia
              </span>
              <span className="flex items-center text-secondary-500 text-small-semiboldr">
                <Bookmark />
                {job?.jobType}
              </span>
            </div>

            <span className="flex items-center text-gray-500 text-small-regular w-full ">
              <Clock2 className="text-primary-500 pr-2" />
              <TimeAgo date={job?.createdAt} />
            </span>
            <span className="flex items-center text-small-regular text-gray-500">
              <Banknote className="text-primary-500 pr-2" />
              {job?.salary} / Monthly
            </span>
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center text-small-regular text-gray-500">
                Status :<span className="text-primary-500">{job?.status}</span>
              </span>
              {
                <Button className="flex items-center text-small-regular text-primary-500 bg-indigo-100 hover:bg-indigo-300">
                  <Link href={`/dashboard/manageJobs/${job?._id}`}>
                    Applicant
                  </Link>
                </Button>
              }
            </div>
            <div className="flex flex-wrap-reverse gap-3">
              <Button
                variant="outline"
                className="ml-auto flex-1 text-primary-500"
              >
                <Link href={`/dashboard/manageJobs/editjob/${job?._id}`}>
                  {" "}
                  <FileEdit />
                  Edit Job
                </Link>
              </Button>
              <Button
                variant="outline"
                className="ml-auto flex-1 text-primary-500"
              >
                <Link href={`/jobs/${job?._id}`}> View Job</Link>
              </Button>
              <Select className="">
                <SelectTrigger>
                  <SelectValue placeholder="Job Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Change Job Status</SelectLabel>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Taken">Taken</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <PresetActions
                HandleActionPerform={HandleJobDelete}
                id={job?._id}
                PressActionButton={"Delete"}
                dialogTitle={"Delete"}
                dialogMessage={
                  "This jobs will no longer be accessible by you or others you&apos;ve shared it with."
                }
              />
            </div>
            {/* send to a frend */}

            {/* full time  */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageJobeCard;
