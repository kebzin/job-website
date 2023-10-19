import { Card, CardContent } from "@/components/ui/card";
// import Buttonupload from "@/components/Common/UploadCvButton";
import React from "react";

const CvManager = () => {
  return (
    <div className="container">
      <Card className="border-dashed min-h-[200px]">
        <CardContent className="text-center flex items-center justify-center flex-col">
          <h3 className="text-base font-medium leading-relaxed text-heading4-medium text-primary">
            Drop files here to upload
          </h3>
          <p className="text-base font-medium leading-relaxed text-body-color">
            To upload file size is (Max 5Mb) and allowed file types are (.doc,
            .docx, .pdf)
          </p>
          {/* <Buttonupload /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default CvManager;
