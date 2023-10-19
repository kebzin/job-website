"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";

import React from "react";

const MessageUser = () => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <CardTitle>Share this document</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input value="Search user" />
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">People with access</h4>
          <div className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div>
                  <Avatar>
                    <AvatarImage src="/avatars/05.png" />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                </div>

                <div>
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <CardDescription>Anyone with the link .</CardDescription>
                </div>
              </div>
              <p>3 munit ago</p>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <CardDescription>
                    Anyone with the link can view this document.
                  </CardDescription>{" "}
                </div>
              </div>
              <p>3 munit ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageUser;
