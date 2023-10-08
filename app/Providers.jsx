"use client";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  // const [isLogin, setIsLogin] = useState(true);
  // const [isCandidate, setIsCandidate] = useState(true);
  // const [user, setUser] = useState(null); // Initialize user as null
  // const [switchLoading, setSwitchLoading] = useState(false);

  // hook
  // const { toast } = useToast();

  // const HandleAccountSwitch = async (event) => {
  //   try {
  //     setSwitchLoading(true);
  //     // Make a PUT request to the API endpoint

  //     const response = await axios.put("/api/users/update", {
  //       role: user?.role === "Candidate" ? "Employear" : "Candidate",
  //       id: user?._id,
  //     });
  //     // Check if the PUT request was successful (e.g., status code 200)
  //     if (response.status === 200) {
  //       await fetchData();

  //       toast({
  //         variant: "destructive",
  //         title: "Switching Account",
  //         description: `Your account has just switched to ${
  //           user?.role === "Candidate" ? "Candidate" : "Employear"
  //         }`,
  //       });

  //       // After successful account switch, refetch user data
  //     } else {
  //       setSwitchLoading(false);
  //       // Handle other status codes or errors if needed
  //       console.error(
  //         "Account switch failed with status code:",
  //         response.status
  //       );
  //     }
  //   } catch (error) {
  //     // Handle any errors that occur during the PUT request
  //     console.error("Error while switching account:", error);
  //     setSwitchLoading(false);
  //   } finally {
  //     setSwitchLoading(false);
  //   }
  // };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("/api/users/Verify");
  //     setUser(response.data);
  //   } catch (err) {}
  // };

  // useEffect(() => {
  //   // Fetch user data when the component mounts
  //   fetchData();
  // }, []);

  return (
    <UserContext.Provider value={{}}>
      <ThemeProvider> {children}</ThemeProvider>
    </UserContext.Provider>
  );
}
