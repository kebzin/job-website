import Breadcrumb from "@/components/Common/Breadcrumb";
import RenderCandidate from "@/components/candidates/RenderCandidate";
import React from "react";
import {
  ApplicantForSingleJob,
  UpdateApplicantStatus,
} from "../../../../lib/actions/jobeAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Clock2, Landmark, MapPin } from "lucide-react";
import TimeAgo from "@/components/Common/TimeAgo";
import { Button } from "@/components/ui/button";
import PresetActions from "@/components/Common/DeleteAction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/signin?callbackUrl=${encodeURIComponent("/")}`);
  }

  const result = await ApplicantForSingleJob({ id });

  const HandleApplicationApproved = async (id) => {
    const data = {
      id: id,
      status: "Reviewed",
    };

    window.alert("Applicant is Approved Succesfully");
  };

  return (
    <>
      <Breadcrumb
        pageName={"Applicant For this Jobs"}
        description={
          "this are the list of applicant for this job you clicked on "
        }
      />

      <div className="min-h-screen">
        <p className="pr-1 text-base font-medium text-body-color hover:text-primary cursor-pointer">
          {result?.applicant.length} Applicant for this job
          <div className=" grid grid-cols-3 gap-3  max-sm:grid-cols-1  max-xl:grid-cols-2 ">
            {result?.applicant.map((data, index) => (
              <div className="bg-primary/10 py-5 px-5 rounded-md">
                <div className="flex gap-3 py-5  flex-wrap">
                  <Avatar className="w-20 h-20 rounded-md">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/company/`} className="text-primary/40">
                      {data?.userId?.FirstName + " " + data?.userId?.LastName}
                    </Link>
                    <div className="w-full">
                      <p className="text-primary-500 text-small-regular flex items-center gap-2">
                        <Landmark />
                        {"Software Development"}
                      </p>
                      <div className="flex items-center text-gray-500 text-small-regular mt-4 ">
                        <MapPin />
                        {data?.userId?.location} The Gambia
                      </div>

                      <div className="flex items-center text-gray-500 text-small-regular w-full ">
                        <Clock2 className="text-primary-500 pr-2" />{" "}
                        <i className="mr-2">Join At</i>
                        <TimeAgo time={data?.createdAt} />
                      </div>
                      <div className="flex  gap-3 items-center mt-3  flex-wrap-reverse">
                        <Button className="bg-primary/30">
                          <Link href={"/"}>User Profile</Link>
                        </Button>
                        <Button className="bg-primary/30">Resumea </Button>
                        {/* <PresetActions
                          HandleActionPerform={HandleApplicationApproved()}
                          PressActionButton={"Reject "}
                          dialogTitle={"Reject Application"}
                          dialogMessage={
                            "This Individual Application will be Rejected. But if you change your minde later Your can Short list or approve this application "
                          }
                        /> */}
                        <Button className="bg-primary/30">
                          Approver Applicnt{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </p>
      </div>
    </>
  );
};

export default page;
