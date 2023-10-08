"use client";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SendToFriend = () => {
  return (
    <>
      <h1 className="text-center text-heading3-bold font-bold  sm:text-3x">
        Send to a frend
      </h1>

      <div className="flex items-center gap-4">
        <div>
          <Label>Your full Name</Label>
          <Input />
        </div>
        <div>
          <Label>Your full Name</Label>
          <Input />
        </div>
      </div>
    </>
  );
};

export default SendToFriend;
