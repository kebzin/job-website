import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { ConnectToMongoDB } from "../../../../lib/mongoDBConnection";
import CredentialsProvider from "next-auth/providers/credentials"; // Import CredentialsProvider
import User from "../../../../models/userModul";
import bcryptjs from "bcryptjs";
import { signOut } from "next-auth/react";

export const authOptions = {
  pages: {
    signIn: "/signin",
    newUser: "/signup", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRIT,
    }),
    CredentialsProvider({
      // Add your own credentials provider configuration here
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Add your custom logic for email and password authentication
        await ConnectToMongoDB();
        // Find the user in your database based on the provided username (email)
        const user = await User.findOne({ Email: credentials.email });
        if (!user) {
          return null;
        }

        // Compare the provided password with the hashed password in your database
        const validPassword = await bcryptjs.compare(
          credentials.password,
          user.Password
        );

        if (validPassword) {
          // Return user data if the password is valid
          return user;
        } else {
          // Password is incorrect

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // store the user id from MongoDB to session
      try {
        const sessionUser = await User.findOne({ Email: token.email });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
          session.user.FirstName = sessionUser.FirstName;
          session.user.LastName = sessionUser.LastName;
          session.user.role = sessionUser.role;
        }
        return session;
      } catch (error) {
        return session;
      }
    },
    async signIn({ credentials, user }) {
      try {
        await ConnectToMongoDB();
        // check if user already exists
        const userExists = await User.findOne({ Email: credentials.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          return {
            redirect: {
              destination: "/signup", // Your signup page
              permanent: false,
            },
          };
        }
        const loginuser = {
          user: (user.email = userExists.Email),
        };

        return loginuser; // Include user data in the session
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return error;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
