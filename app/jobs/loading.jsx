import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="container flex items-center flex-col  h-screen mt-28 gap-6 ">
      <div className="flex items-center space-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[300px]" />
          <Skeleton className="h-6 w-[350px]" />
        </div>
      </div>
      <div className="mt-28 flex  gap-3">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[10px]" />
      </div>

      <div className="mt-28 flex  gap-3 flex-col">
        <Skeleton className="h-52 w-[300px] max-sm::w-[500px]" />
        <Skeleton className="h-52 w-[300px] sm:w-[500]" />
      </div>
    </div>
  );
};

export default loading;
