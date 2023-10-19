"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React from "react";

const MessageContent = () => {
  const message = [{ mine: true }, {}, { mine: true }, {}, {}, { mine: true }];
  return (
    <div className="w-full ">
      <Card className="relative p-3">
        <div className="absolute shadow-md py-4 left-0 right-0 top-0 flex items-center bg-white">
          <Avatar>
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <h2>Name</h2>
        </div>
        <div className=" max-h-[500px] overflow-auto ">
          <div className="flex  mt-16  flex-col w-full ">
            {message.map((element, index) => {
              return (
                <div
                  key={index}
                  className={`max-w-sm ${
                    element.mine === true ? "self-end " : "self-start"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/avatars/01.png" />
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <p>3 munit ago</p>
                  </div>
                  <div
                    className={` ${
                      element.mine === true ? "bg-primary" : "bg-primary/50"
                    }  text-white p-3 rounded-md`}
                  >
                    <p>
                      How likely are you to recommend our company to your
                      friends and family?
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Enter Message ...."
            className="py-7 "
            multiple={true}
          />
          <Button className="py-6 bg-primary hover:bg-primary/25">
            <Send /> Send
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MessageContent;
