import { Facebook, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const RenderSingleJobContent = ({ data }) => {
  return (
    <div>
      <h1 className="mb-5 text-heading3-bold font-bold  sm:text-3xl">
        Job Description
      </h1>
      <p className="text-base font-medium  text-body-color leading-loose">
        {data?.description}
      </p>

      <h1 className="mb-5 text-heading3-bold font-bold  sm:text-3xl mt-5">
        {" "}
        Responsibilities
      </h1>
      <p className="text-base font-medium leading-loose text-body-color ">
        {data?.responsibilities}
      </p>
      <h1 className="mb-5 text-heading3-bold font-bold  sm:text-3xl mt-5">
        Skill & Requirement
      </h1>
      <p className="text-base font-medium leading-loose text-body-color  ">
        {data?.requirements}
      </p>

      <div className="flex items-center flex-wrap gap-4 mt-6">
        <h3 className="text-body1-bold">Share this job </h3>
        <div className="flex items-start gap-2">
          <Button className="bg-primary-500 flex">
            <Facebook />

            <Link href={"/"}>Facebook</Link>
          </Button>
          <Button className="bg-cyan-600">
            <Twitter />

            <Link href={"/"}>Twitter</Link>
          </Button>
          <Button className="bg-sky-600">
            <Linkedin />
            <Link href={"/"}>Linkedin</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenderSingleJobContent;
