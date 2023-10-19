"use client";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
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

import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { UpdatecompanyData } from "@/lib/actions/companyActions";
import { useRouter } from "next/navigation";

const CompanyProfileForm = ({ company, id }) => {
  // const { user } = useContext(UserContext);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    Company_Name: z.string().min(2),
    Company_Email: z.string().min(2),
    Company_Phone_Number: z.string().min(2),
    Company_Website: z.string().min(5),
    Company_Address: z.string().min(5),
    Industry: z.string().min(2),
    twitter: z.string().min(5),
    linkedin: z.string().min(5),
    facebook: z.string().min(5),
    instagram: z.string().min(5),
    Focusesd: z.string().min(100),
    About_Company: z.string().min(200),
  });

  //Initialize React Hook Form with schema and default values

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Company_Name: company?.companyName,
      Company_Email: company?.companyEmail,
      Company_Phone_Number: company?.companyPhoneNumber,
      Company_Website: company?.companyWebsite,
      Company_Address: company?.companyAddress,
      Industry: company?.industry,
      twitter: company?.twitter,
      linkedin: company?.linkedin,
      facebook: company?.facebook,
      instagram: company?.instagram,
      Focusesd: company?.focused,
      About_Company: company?.aboutCompany,
    },
  });

  async function onSubmit() {
    setLoading(true);
    try {
      const formValues = form.getValues();
      const companyData = {
        companyName: formValues.Company_Name,
        companyEmail: formValues.Company_Email,
        companyPhoneNumber: formValues.Company_Phone_Number,
        companyWebsite: formValues.Company_Website,
        companyAddress: formValues.Company_Address,
        industry: formValues.Industry,
        twitter: formValues.twitter,
        linkedin: formValues.linkedin,
        facebook: formValues.facebook,
        instagram: formValues.instagram,
        focused: formValues.Focusesd,
        aboutCompany: formValues.About_Company,
      };

      const response = await UpdatecompanyData({
        companyData,
        userId: id,
        id: company._id,
      });
      if (response.status === 200) {
        return toast({
          title: "Updating Company Profile Data",
          description: "Company Profile is updated succesfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update Company Profile",
          description: `Error while Updating Company innfo `,
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Update Company Profile",
        description: `Error while Updating Company innfo `,
      });
      console.error("Error while Updating Company innfo:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="py-10 w-full">
      <Card variant={"outlined"} className="relative">
        <CardContent className="">
          <Avatar className="w-28 h-28 rounded-md overflow-hidden relative">
            <AvatarImage src="assets/logo.png" />
            <AvatarFallback className="w-28 h-28 rounded-md ">
              CP
            </AvatarFallback>
            <div className=" bg-transparent top-20 left-0 ">
              <Input type="file" className=" w-full h-full" />
            </div>
            <span className="text-subtle-medium text-gray-500">
              Select your company profile
            </span>
          </Avatar>

          {/* forms */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 items-center gap-7 max-md:grid-cols-1 w-full"
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
                        {fieldName === "About_Company" ? (
                          <div>
                            <Textarea
                              value={field.value}
                              onChange={(e) => {
                                // Call the setValue function to update the form value
                                form.setValue(fieldName, e.target.value);
                              }}
                              className="h-80 "
                              placeholder="Provide a brief overview of your company. This information will help others gain a better understanding of your organization."
                            />
                          </div>
                        ) : fieldName === "Focusesd" ? (
                          <div>
                            <Textarea
                              value={field.value}
                              onChange={(e) => {
                                // Call the setValue function to update the form value
                                form.setValue(fieldName, e.target.value);
                              }}
                              className="h-80 "
                              placeholder="Provide a brief overview of what your company Focusesd on"
                            />
                          </div>
                        ) : (
                          <Input
                            value={field.value}
                            className="py-8 w-full"
                            placeholder={
                              fieldName === "facebook"
                                ? "https://www.facebook.com/your-company"
                                : fieldName === "instagram"
                                ? "https://www.instagram.com/your-company"
                                : fieldName === "twitter"
                                ? " https://www.twitter.com/your-company"
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
                      <FormMessage />
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
                {loading ? "processing" : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfileForm;
