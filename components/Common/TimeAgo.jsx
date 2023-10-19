"use client";
import React from "react";
import TimeAgo from "react-timeago";

const TimeAgoComponent = ({ time }) => {
  return <TimeAgo date={time} />;
};

export default TimeAgoComponent;
