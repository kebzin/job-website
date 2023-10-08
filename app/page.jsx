import { Button } from "@/components/ui/button";
import Image from "next/image";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero/index";

export default function Home() {
  return (
    <div className="mt-20 pb-32">
      <ScrollUp />
      <Hero />
    </div>
  );
}
