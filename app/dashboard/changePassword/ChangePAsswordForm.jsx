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

import { useToast } from "@/components/ui/use-toast";
import { updateOffeser } from "@/lib/actions/userAction";
import { ToastAction } from "@/components/ui/toast";

const PAsswordChangeForm = ({ id }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    New_Password: z.string().min(2),
    Renter_Password: z.string().min(2).max(50),
  });

  //Initialize React Hook Form with schema and default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      New_Password: "",
      Renter_Password: "",
    },
  });

  // Handle Gender field value changes

  async function onSubmit() {
    // Access form values

    setLoading(true);
    const formValues = form.getValues();
    console.log(formValues.New_Password, formValues.Renter_Password);
    if (formValues.New_Password !== formValues.Renter_Password) {
      return (
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "Passwords do not match. Please make sure they are the same.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        }),
        setLoading(false)
      );
    }
    try {
      const user = {
        Password: formValues.New_Password, //
        VerifyPassword: formValues.Renter_Password, //

        // You can also access specific field values like this:
      };
      const responde = await updateOffeser({ user, id });
      if (responde.status === 200) {
        toast({
          variant: "outline",
          title: "Password Update",
          description: responde.message,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error while updating password:", error);
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
                  {
                    <Input
                      className="py-8 w-full text-black"
                      placeholder={`Enter ${fieldName
                        .replace(/_+/g, " ")
                        .replace(/ /g, " ")}`}
                      {...field}
                      onChange={(e) => {
                        // Call the setValue function to update the form value
                        form.setValue(fieldName, e.target.value);
                      }}
                    />
                  }
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
          {loading ? "processing request" : "Update Password"}
        </Button>
      </form>
    </Form>
  );
};

export default PAsswordChangeForm;
