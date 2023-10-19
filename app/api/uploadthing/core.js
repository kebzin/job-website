import { createUploadthing } from "uploadthing/next";
import CV from "../../../models/CVManager";

const f = createUploadthing();

const auth = (req) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const FileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  UploadCV: f({ "application/pdf": { maxFileSize: "5MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      console.log(user);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await CV.create({ CvUrl: file.url, userId: metadata.userId });

      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
};
