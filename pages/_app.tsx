import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../context";
import { useContext, useEffect, FC } from "react";
import { AuthGuard } from "../components";
import { UiProvider } from "../context/ui";

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const { requireAuth = true, lockedAfterLogin = false } = Component;

  return (
    <SessionProvider>
      <AuthProvider>
        <UiProvider>
          <AuthGuard
            requireAuth={requireAuth}
            lockedAfterLogin={lockedAfterLogin}
          >
            <Component {...pageProps} />
          </AuthGuard>
        </UiProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
