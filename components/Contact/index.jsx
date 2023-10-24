"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import NewsLatterBox from "./NewsLatterBox";
import { useState } from "react";
import { SendEmail } from "../../lib/actions/send";

const Contact = () => {
  // hooks
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit } = useForm();

  // SendEmail
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await SendEmail({
        message: data.message,
        email: data.email,
        name: data.name,
      });

      console.log(response.data);
      if (response.data.statusCode === 403) {
        return (
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: response.data.message,
          }),
          setLoading(false)
        );
      } else if (response.status === 500) {
        return (
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: response.message,
          }),
          setLoading(false)
        );
      }
      return (
        toast({
          variant: "",
          title: "Email Sent",
          description:
            "Email send Succesfully. our support team wil get back to you withen 24hrs",
        }),
        setLoading(false)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[10%] py-11 px-8 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-heading3-bold sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium"
                      >
                        Your Name
                      </label>
                      <input
                        {...register("Name")}
                        type="text"
                        name="Name"
                        placeholder="Enter your name"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none "
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium"
                      >
                        Your Email
                      </label>
                      <input
                        {...register("email")}
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none  "
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium "
                      >
                        Your Message
                      </label>
                      <textarea
                        {...register("message")}
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none "
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <Button
                      disabled={loading}
                      type="submit"
                      className=" bg-primary  transition duration-300 ease-in-out "
                    >
                      {loading === true
                        ? "Processing request"
                        : " Submit Email"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
