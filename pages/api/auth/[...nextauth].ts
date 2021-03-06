import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { FirebaseLogin } from "../../../firebase";

export default NextAuth({
  providers: [
    Credentials({
      name: "Custom Login",
      credentials: {
        correo: {
          label: "Correo:",
          type: "email",
          placeholder: "correo@google.com",
        },
        contrasena: {
          label: "Contraseña:",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        return await FirebaseLogin(
          credentials!.correo,
          credentials!.contrasena
        );
      },
    }),
  ],

  // Custom Pages
  pages: {
    signIn: "/login",
    newUser: "/register",
  },

  session: {
    maxAge: 2592000, /// 30d
    strategy: "jwt",
    updateAge: 86400, // cada día
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
});
