"use client";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import Link from "next/link";
import TimeAgo from "react-timeago";
import {
  Banknote,
  Bookmark,
  Clock2,
  Heart,
  HeartHandshake,
  Landmark,
  Mail,
  MapPin,
  SendHorizontal,
  Share2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
const JobRender = ({ data, setdata }) => {
  const { resolvedTheme } = useTheme();
  const { toast } = useToast();
  // dtata state
  const [save, setSave] = useState(false);
  const [senderName, setSenderName] = useState(null);
  const [reciverName, setReciverName] = useState(null);
  const [mesage, setMessage] = useState(null);

  const HandleSaveJobe = async () => {
    setSave(true);
  };

  const HandleSendToFriend = async () => {
    try {
      toast({
        title: "Send Job to friend ",
        description: "Job have been succesfully send to your friend  ",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem while sending message to your friend .",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className=" py-2 px-3  w-full">
      {/* render filter */}

      {/* job card */}

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
            <Link href={`/jobs/${data.id}`}>
              <h3
                className={`mb-4 text-2xl font-bold leading-tight tracking-wider ${
                  resolvedTheme === "dark" ? "text-primary" : "text-primary"
                }`}
              >
                {data?.jobTitle}
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
                  {data?.location} The Gambia
                </span>
                <span className="flex items-center text-secondary-500 text-small-semiboldr">
                  <Bookmark />
                  {data?.jobType}
                </span>
              </div>

              <div className="py-5 max-md:hidden">
                <Label className="text-gray-600 ">Job Description</Label>
                <p className="text-gray-500  max-md:hidden text-small-semibold line-clamp-2">
                  {data?.description}
                </p>
              </div>

              <span className="flex items-center text-gray-500 text-small-regular w-full ">
                <Clock2 className="text-primary-500 pr-2" />
                <TimeAgo date={data?.createdAt} />
              </span>
              <span className="flex items-center text-small-regular text-gray-500">
                <Banknote className="text-primary-500 pr-2" />
                {data?.salary} / Monthly
              </span>
              <div className="flex items-center justify-between w-full">
                <span className="flex items-center text-small-regular text-gray-500">
                  Status :
                  <span className="text-primary-500">{data?.status}</span>
                </span>
                {
                  <Button className="flex items-center text-small-regular text-primary-500 bg-indigo-100 hover:bg-indigo-300">
                    {data?.urgent === true ? "Urgent" : "Normal"}
                  </Button>
                }
              </div>

              {/* send to a frend */}
              <div className="flex items-center gap-2 text-white justify-end pt-3 flex-wrap">
                <Dialog>
                  <DialogTrigger className="bg-primary py-2 pl-2 pr-2 rounded-md flex items-center gap-1 hover:bg-primary/25">
                    <Mail /> Send to a friend
                  </DialogTrigger>
                  <DialogContent>
                    <h1
                      className={`text-center text-heading3-bold font-bold  sm:text-3x ${
                        resolvedTheme === "dark" ? "text-dark" : ""
                      }`}
                    >
                      Send to a frend
                    </h1>

                    <div
                      className={`flex items-center gap-4  ${
                        resolvedTheme === "dark" ? "text-dark" : ""
                      }`}
                    >
                      <div>
                        <Label>Your full Name</Label>
                        <Input
                          onChnage={(event) =>
                            setSenderName(event.target.value)
                          }
                          className={`py-6 w-full  focus-visible:ring-primary `}
                          placeholder="Enter Your Full Name"
                        />
                      </div>
                      <div>
                        <Label>Your friend Name</Label>
                        <Input
                          onChnage={(event) =>
                            setReciverName(event.target.value)
                          }
                          className={`py-6 w-full  focus-visible:ring-primary  `}
                          placeholder="Enter Your Full Name"
                        />
                      </div>
                    </div>
                    <Textarea
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Type your message here."
                      id="message-2"
                      className={`w-full  focus-visible:ring-primary ${
                        resolvedTheme === "dark" ? "text-dark" : ""
                      } `}
                    />

                    <Button>
                      <Link href={`/jobs/${data.id}`}>View Job</Link>
                    </Button>
                    <Button onClick={HandleSendToFriend}>
                      <SendHorizontal /> Send
                    </Button>
                  </DialogContent>
                </Dialog>

                <Button className="" onClick={HandleSaveJobe}>
                  {save === false ? <Heart /> : <HeartHandshake />}
                  {save === false ? "save" : "saved"}
                </Button>

                <Button>
                  <Share2 /> Share
                </Button>
                <Button>
                  <Link href={`/jobs/${data.id}`}>View Job</Link>
                </Button>
              </div>

              {/* full time  */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobRender;
