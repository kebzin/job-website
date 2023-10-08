import React from "react";
import {
  Banknote,
  Bookmark,
  Calendar,
  Hourglass,
  MapPin,
  Snail,
  Users,
} from "lucide-react";
import TimeAgo from "react-timeago";

const RenderJobeOverview = ({ data }) => {
  return (
    <div className="bg-primary/[20%] py-5 px-7 rounded-md  w-full max-lg:max-w-min  max-lg:min-w-md">
      <h3 className="text-heading4-medium pb-10">Job Overview</h3>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2">
            <Calendar className="text-primary-500" />{" "}
            <p className="text-base1-semibold">Date Posted</p>{" "}
          </h4>

          <p className="text-gray-500 text-small-semibold">
            {" "}
            {data?.createdAt.toLocaleDateString()}
            {/* <TimeAgo date={data?.createdAt} /> */}
          </p>
        </div>

        <div className="flex items-center justify-between gap-10">
          <h4 className="flex items-center gap-2">
            <Hourglass className="text-primary-500" />{" "}
            <p className="text-base1-semibold">Application date Line:</p>
          </h4>

          <p className="text-gray-500 text-small-semibold">
            {/* {data?.applicationDeadLine} */}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2">
            <MapPin className="text-primary-500" />{" "}
            <p className="text-base1-semibold">Location</p>{" "}
          </h4>

          <p className="text-gray-500 text-small-semibold">{data?.location}</p>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2">
            <Banknote className="text-primary-500" />{" "}
            <p className="text-small-semibold">Salary</p>{" "}
          </h4>

          <p className="text-gray-500 text-small-semibold">
            {data?.salary} /monthly
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2">
            <Snail className="text-primary-500" />{" "}
            <p className="text-base1-semibold">Urgency </p>{" "}
          </h4>

          <p className="text-gray-500 text-small-semibold">
            {data?.urgen === true ? "Yes" : "No"}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2">
            <Users className="text-primary-500" />{" "}
            <p className="text-base1-semibold">Gender Base </p>{" "}
          </h4>

          <p className="text-gray-500 text-small-semibold">{data?.gender}</p>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2">
            <Bookmark className="text-primary-500" />{" "}
            <p className="text-base1-semibold">Job Type</p>{" "}
          </h4>

          <p className="text-gray-500 text-small-semibold">{data?.jobType}</p>
        </div>
      </div>
    </div>
  );
};

export default RenderJobeOverview;
