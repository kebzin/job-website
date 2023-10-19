import { Button } from "@/components/ui/button";
import Image from "next/image";
import Features from "@/components/Features/index";

import RecruitmentAdvertise from "@/components/Common/RecruitmentAdvertised";
import Hero from "@/components/Hero";
import AboutSectionOne from "@/components/About/AboutSectionOne";

export default function Home() {
  return (
    <div className="mt-20 pb-32 min-h-screen">
      <Hero />
      <Features />
      <AboutSectionOne />
      <div className="container">
        <RecruitmentAdvertise />
      </div>
    </div>
  );
}
