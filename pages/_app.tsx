import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../context";
import { useContext, useEffect, FC } from "react";
import { AuthGuard } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const { requireAuth = true, lockedAfterLogin = false } = Component;

  return (
    <SessionProvider>
      <AuthProvider>
        <AuthGuard
          requireAuth={requireAuth}
          lockedAfterLogin={lockedAfterLogin}
        >
          <Component {...pageProps} />
        </AuthGuard>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
