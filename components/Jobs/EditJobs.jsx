"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown, CalendarIcon, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import { CompanyCategory } from "../Common/constant";
import { UpdateJob } from "@/lib/actions/jobeAction";
// import { UpdateJob } from "@/lib/actions/job.action";

const EditJobs = ({ singleJobs, id }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  const formSchema = z.object({
    Job_Title: z.string().min(2),
    Offered_Salary: z.string().min(2).max(50),
    experienceLevel: z.string().min(2).max(50),
    Job_Location: z.string().min(2).max(50),
    Gender: z.string().min(2).max(50),
    Part_Time_Or_Full_Time: z.string().min(2).max(50),
    urgent: z.string().min(2).max(50),
    requirements: z.string().min(2).max(500),
    Application_Deadline: z.date(),
    Category: z.string().min(2),
    responsibilities: z.string().min(2),
    Description: z.string().min(0),
  });

  //Initialize React Hook Form with schema and default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Job_Title: singleJobs?.jobTitle,
      Description: singleJobs?.description,
      Offered_Salary: singleJobs?.salary,
      experienceLevel: singleJobs?.experienceLevel,
      Complete_Address: singleJobs?.location,
      Part_Time_Or_Full_Time: singleJobs?.jobType,
      // Application_Deadline: singleJobs?.applicationDeadLine,
      urgent: singleJobs?.urgent,
      Category: singleJobs?.Category,
      Gender: singleJobs?.gender,
      requirements: singleJobs?.requirements,
      responsibilities: singleJobs?.responsibilities,
    },
  });

  // Handle Gender field value changes
  const handleGenderChange = (value) => {
    form.setValue("Gender", value);
  };

  const handleDuraionChange = (value) => {
    form.setValue("Part_Time_Or_Full_Time", value);
  };

  const HandleExperienceLevel = (value) => {
    form.setValue("experienceLevel", value);
  };
  const HandleUrgent = (value) => {
    form.setValue("urgent", value);
  };

  async function onSubmit() {
    // Access form values
    setLoading(true);
    try {
      const formValues = form.getValues();
      console.log("start");
      const jobcontent = {
        userId: id,
        jobid: singleJobs?._id,
        jobTitle: formValues.Job_Title, //
        description: formValues.Description, //
        salary: formValues.Offered_Salary, //
        experienceLevel: formValues.experienceLevel, //
        location: formValues.Job_Location, //
        gender: formValues.Gender, //
        jobType: formValues.Part_Time_Or_Full_Time, //
        urgent: formValues.urgent, //
        applicationDeadLine: formValues.Application_Deadline, //
        responsibilities: formValues.responsibilities, //
        requirements: formValues.requirements, //
        Category: formValues.Category, //
      };
      const response = await UpdateJob({
        jobcontent,
      });

      if (response.status === 200) {
        return (
          toast({
            title: "Update Job",
            description: `${response.message}:.. "Taking you to your jobs Job Management page..."`,
          }),
          router.push("/dashboard/manageJobs")
        );
      } else {
        // Handle other status codes or errors if needed
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response?.message,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error while updating job:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 items-center gap-7 max-md:grid-cols-1"
      >
        {Object.keys(formSchema.shape).map((fieldName) => (
          <FormField
            key={fieldName}
            className="w-full "
            control={form.control}
            name={fieldName} // Assign a unique name to each field
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-600">
                  {fieldName.replace(/_+/g, " ").replace(/ /g, " ")}
                </FormLabel>
                <FormControl>
                  {fieldName === "Description" ? (
                    <Textarea
                      value={field.value}
                      onChange={(e) => {
                        // Call the setValue function to update the form value
                        form.setValue(fieldName, e.target.value);
                      }}
                      className="min-h-[300px] text-black"
                      placeholder="
                      As a Marketing Manager at [Company Name], you will play a pivotal role in developing and executing marketing strategies that promote our brand, products, and services. You will work closely with cross-functional teams and report to the Director of Marketing to ensure our marketing initiatives align with our overall business goals."
                    />
                  ) : fieldName === "responsibilities" ? (
                    <Textarea
                      value={field.value}
                      onChange={(e) => {
                        // Call the setValue function to update the form value
                        form.setValue(fieldName, e.target.value);
                      }}
                      className="min-h-[300px] text-black"
                      placeholder="
                  As a Marketing Manager at [Company Name], you will play a pivotal role in developing and executing marketing strategies that promote our brand, products, and services. You will work closely with cross-functional teams and report to the Director of Marketing to ensure our marketing initiatives align with our overall business goals."
                    />
                  ) : fieldName === "Category" ? (
                    <Popover
                      open={open}
                      onOpenChange={setOpen}
                      className="flex overflow-auto"
                      value={field.value}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className=" justify-between w-full py-7 text-black"
                        >
                          {/* {value
                            ? CompanyCategory.find(
                                (element) => element.name === value
                              )?.label
                            : field.value} */}
                          {field.value === ""
                            ? "Select Category ...."
                            : field.value}
                          <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className=" p-0">
                        <Command>
                          <CommandInput placeholder="Search element..." />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {CompanyCategory.map((element) => (
                              <CommandItem
                                key={element.id}
                                onSelect={(currentValue) => {
                                  setValue(
                                    form.setValue("Category", currentValue),
                                    console.log(form.getValues("Category")),

                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={` mr-2 h-4 w-4
                       ${value === element.name ? "opacity-100" : `opacity-0`}`}
                                />
                                {element.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  ) : fieldName === "urgent" ? (
                    <Select
                      value={field.value}
                      className="w-full"
                      onValueChange={HandleUrgent}
                      // value={form.watch("urgent")}
                    >
                      <SelectTrigger className="py-8 text-black">
                        <SelectValue placeholder="Urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Choose Urgency</SelectLabel>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value={"false"}>No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : fieldName === "Gender" ? (
                    <Select
                      value={field.value}
                      className=" w-full "
                      onValueChange={handleGenderChange}
                      defaultValue={fieldName}
                    >
                      <SelectTrigger className="py-8 text-black">
                        <SelectValue placeholder="Selet the Gender you are looning for" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Femal">Female</SelectItem>
                        <SelectItem value="All Gender">All Gender</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : fieldName === "Part_Time_Or_Full_Time" ? (
                    <Select
                      className=" w-full "
                      onValueChange={handleDuraionChange}
                      defaultValue={fieldName}
                      value={field.value}
                    >
                      <SelectTrigger className="py-8 text-black">
                        <SelectValue placeholder=" select Job Type" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Full Time">Full Time</SelectItem>
                        <SelectItem value="Part Time">Part Time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : fieldName === "experienceLevel" ? (
                    <Select
                      className=" w-full text-black"
                      onValueChange={HandleExperienceLevel}
                      defaultValue={fieldName}
                      value={field.value}
                    >
                      <SelectTrigger className="py-8 text-black">
                        <SelectValue placeholder="Choose Experience level" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Entry Level">
                          Entery Level
                        </SelectItem>
                        <SelectItem value="Middle Level">
                          Middle level
                        </SelectItem>
                        <SelectItem value="Senior Level">
                          Senior level
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : fieldName === "Application_Deadline" ? (
                    <Popover value={field.value}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full py-8 text-left font-normal text-black
                             ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Input
                      value={field.value}
                      className="py-8 w-full text-black"
                      placeholder={
                        fieldName === "Offered_Salary"
                          ? "GMD 5,000"
                          : fieldName === "Career_Level"
                          ? "eg : Human Resources, Marketting, Research Designer etc."
                          : `Enter ${fieldName
                              .replace(/_+/g, " ")
                              .replace(/ /g, " ")}`
                      }
                      {...field}
                      onChange={(e) => {
                        // Call the setValue function to update the form value
                        form.setValue(fieldName, e.target.value);
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        ))}
        {/* Add other form fields in a similar manner */}
        <Button
          disabled={loading}
          className="bg-primary-500 py-8 mt-5"
          type="submit"
        >
          {loading ? "Submitting Update " : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default EditJobs;
