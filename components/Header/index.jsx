"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import menuData from "./menuData";
import ThemeButton from "./ThemeToggleButton";
import { Button } from "../ui/button";
import { redirect, usePathname, useRouter } from "next/navigation";
import { signOut, signIn, useSession } from "next-auth/react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import MyAccount from "../Dashboard/MyAccount";
import { updateOffeser } from "@/lib/actions/userAction";
import { useDebounce } from "use-debounce";

const Header = () => {
  // Navbar toggle

  // states
  const { data: session } = useSession();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  let [isPending, startTransition] = useTransition();

  // hooks
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  // functions
  const navbarToggleHandler = () => {
    setProfileOpen(false);
    setNavbarOpen(!navbarOpen);
  };
  const ProfileToggleHandeler = () => {
    setNavbarOpen(false);
    setProfileOpen((prev) => !prev);
  };

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const HandleAccountSwitch = async () => {
    try {
      const user = {
        role: session?.user?.role === "Candidate" ? "Employear" : "Candidate",
      };
      const result = await updateOffeser({ user, id: session?.user.id });
      if (result.status === 200) {
        toast({
          variant: "",
          title: "Succesfully Switched",
          description: ` Account Succesfully switched. ${result.message}`,
        });

        setTimeout(() => {
          toast({
            variant: "",
            title: "Sign Out triggered",
            description: `We are sign you out because you just switched your account: don't worry it is for security reason. you can sign in back again using your email and password`,
          });
        }, 3000);

        setTimeout(async () => {
          await signOut();
        }, 9900);
      } else {
        return toast({
          variant: "destructive",
          title: "Uh oh! something went Wrong   .",
          description: `An Error Occured. Error${result.message}`,
          action: (
            <ToastAction onClick={() => signIn()} altText="Log In">
              Log In
            </ToastAction>
          ),
        });
      }
    } catch (error) {
      console.log("Error in account switch", error?.message || "unknown");
      toast({
        variant: "destructive",
        title: "Uh oh! something went wrong  .",
        description: `Error in account switching ${error.message}`,
      });
    }
  };

  const HandleNavigatingToPostJob = () => {
    if (!session?.user) {
      return toast({
        variant: "destructive",
        title: "Uh oh! You are not login  .",
        description:
          "To access these  resources and unlock their full potential, you must first log in to your accoun.",
        action: (
          <ToastAction onClick={() => signIn()} altText="Log In">
            Log In
          </ToastAction>
        ),
      });
    } else if (session?.user.role === "Candidate") {
      return toast({
        variant: "destructive",
        title: "Uh oh! You are not Authorized  .",
        description:
          "To access these  resource please switch your account to Employear. ",
        action: (
          <ToastAction
            onClick={() => startTransition(() => HandleAccountSwitch())}
            altText="Switch"
          >
            {isPending === true ? "Switching Account.." : "Switch Accout"}
          </ToastAction>
        ),
      });
    } else router.push("/dashboard/postJob");
  };
  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${
          sticky
            ? "!fixed !z-[9999] shadow-sm !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
            : "absolute"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src="/images/logo/logo-2.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full dark:hidden"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50  py-4 px-6 duration-300  bg-primary/80 dark:border-body-color/20  lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={menuItem.id} className="group relative">
                        {menuItem.path ? (
                          <Link
                            onClick={() => setNavbarOpen((prev) => !prev)}
                            href={menuItem.path}
                            className={`flex py-2 text-base  group-hover:opacity-70  lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 ${
                              pathname === menuItem.path ? "text-primary" : ""
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <Link
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base  group-hover:opacity-70  lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="15" height="14" viewBox="0 0 15 14">
                                  <path
                                    d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </Link>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0 gap-3 relative">
                <Button
                  className="bg-primary-500 max-sm:hidden"
                  onClick={HandleNavigatingToPostJob}
                >
                  Post Jobs
                </Button>

                {session?.user ? (
                  <div className="relative ">
                    <div
                      className="flex items-center gap-2 cursor-pointer  "
                      onClick={ProfileToggleHandeler}
                    >
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn." />
                        <AvatarFallback className="text-black">
                          {session?.user?.FirstName?.charAt(0) +
                            session?.user?.LastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-gray-500 text-small-regular">
                        Account
                      </p>
                      <ChevronDown className="text-indigo-300" />
                    </div>
                    <div
                      className={`fixed zoom-out-100  bg-white shadow-lg py-5 rounded-md`}
                    >
                      {profileOpen && (
                        <MyAccount handleclosed={setProfileOpen} />
                      )}
                    </div>
                  </div>
                ) : (
                  <Button
                    className="max-sm:text-tiny-medium"
                    onClick={() => signIn()}
                  >
                    {/* <Link href="/signin" className="  "> */}
                    Sign In
                    {/* </Link> */}
                  </Button>
                )}
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden cursor-pointer"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-primary/[20%]  transition-all duration-300  cursor-pointer ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-primary/[20%] transition-all duration-300  cursor-pointer${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-primary/[20%] transition-all duration-300 cursor-pointer  ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <div>
                  <ThemeButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
