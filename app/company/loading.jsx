import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <div className="container f h-screen mt-28 gap-6  max-h-screen overflow-hidden">
      <div className="flex items-center space-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[300px]" />
          <Skeleton className="h-6 w-[350px]" />
        </div>
      </div>

      <div className=" flex items-center flex-wrap gap-10 mt-5">
        {data.map((element, index) => (
          <Skeleton key={index} className="h-12  min-w-[250px]" />
        ))}
      </div>
    </div>
  );
};

export default loading;
