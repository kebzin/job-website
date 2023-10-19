"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/components/ui/use-toast";
import { PostNewJob } from "@/lib/actions/jobeAction";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown, Check } from "lucide-react";
import { CompanyCategory } from "@/components/Common/constant";
import { updateOffeser } from "@/lib/actions/userAction";
import { useRouter } from "next/navigation";
const Profile = ({ user, route }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // hooks
  const router = useRouter();

  const formSchema = z.object({
    First_Name: z.string().min(2),
    Last_Name: z.string().min(2),
    Job_Title: z.string().min(2),
    Age: z.string().min(2),
    gender: z.string().min(2),
    Education_Level: z.string().min(2),
    Full_Address: z.string().min(2),
    Category: z.string().min(3),
    About: z.string().min(200),
  });

  //Initialize React Hook Form with schema and default values
  const id = user._id;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      First_Name: user?.FirstName,
      Last_Name: user?.LastName,
      Job_Title: user?.JobTitle,
      Age: user?.age,
      gender: user?.Gender,
      Full_Address: user?.Address,
      Category: user?.Category,
      About: user?.About,
      Education_Level: user?.Education_Level,
    },
  });

  // Handle Gender field value changes
  const handleGenderChange = (value) => {
    form.setValue("gender", value);
  };

  async function onSubmit() {
    // Access form values
    setLoading(true);
    try {
      const formValues = form.getValues();
      const user = {
        FirstName: formValues.First_Name,
        LastName: formValues?.Last_Name,
        Job_Title: formValues.Job_Title,
        age: formValues.Age,
        Gender: formValues.gender,
        Education_Level: formValues.Education_Level,
        Address: formValues.Full_Address,
        Category: formValues.Category,
        About: formValues.About,

        // You can also access specific field values like this:
      };
      const responde = await updateOffeser({ user, id });
      if (responde.status) {
        toast({
          variant: "outline",
          title: "Update Profile",
          description: "profile updated succesfully",
        });
        setLoading(false);
        router.replace("/");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error while updatinf profile:", error);
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
                  {fieldName === "About" ? (
                    <Textarea
                      value={field.value}
                      onChange={(e) => {
                        // Call the setValue function to update the form value
                        form.setValue(fieldName, e.target.value);
                      }}
                      className="min-h-[300px] text-black"
                      placeholder="Tell us something about yourself"
                    />
                  ) : fieldName === "Category" ? (
                    <Popover
                      open={open}
                      onOpenChange={setOpen}
                      className="flex overflow-auto"
                    >
                      <PopoverTrigger asChild>
                        <Button
                          value={field.value}
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
                  ) : fieldName === "Gender" ? (
                    <Select
                      className=" w-full "
                      onValueChange={handleGenderChange}
                      defaultValue={fieldName}
                      value={field.value}
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
                  ) : fieldName === "gender" ? (
                    <Select
                      className=" w-full "
                      onValueChange={handleGenderChange}
                      defaultValue={fieldName}
                    >
                      <SelectTrigger className="py-8 text-black">
                        <SelectValue placeholder=" select Gender" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={field.value}
                      className="py-8 w-full text-black"
                      placeholder={
                        fieldName === "Education_Level"
                          ? "Certificate , Diploma , Master etc."
                          : fieldName === "Job_Title"
                          ? "eg : Human Resources, Marketting, Research , Designer etc."
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
          {loading ? "processing request" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default Profile;
