import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const RecruitmentAdvertise = () => {
  return (
    <section className="bg-primary/[20%] py-5 px-5 rounded-xl mt-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-heading2-bold py-3 ">Recruiting?</h3>
          <p className=" text-gray-500 mb-5 tracking-widest sm:text-small-regular">
            Advertise your jobs to millions of monthly users and search 15.8
            million CVs in our database.
          </p>
        </div>

        <div>
          <Image src={"/images/recruit.png"} width={300} height={300} />
        </div>
      </div>
      <Button className="py-6 px-8 bg-primary-500">Start Recrutting Now</Button>
    </section>
  );
};

export default RecruitmentAdvertise;
