import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../context/";
import { Sidebar, FullScreenLoading, SideMenu } from "../../components/ui";
export function AuthGuard({
  children,
  lockedAfterLogin = false,
  requireAuth = false,
}: {
  children: JSX.Element;
  lockedAfterLogin: boolean;
  requireAuth: boolean;
}) {
  const { user, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initializing) {
      if (user) {
        if (lockedAfterLogin) {
          router.push("/");
        }
      } else {
        if (requireAuth) {
          router.push("/login");
        }
      }
    }
  }, [initializing, router, user, lockedAfterLogin, requireAuth]);

  if (initializing) {
    return <FullScreenLoading />;
  } else {
    if (user) {
      if (!lockedAfterLogin) {
        return <Sidebar>{children}</Sidebar>;
      }
    } else {
      if (!requireAuth) {
        return <>{children}</>;
      }
    }
  }
  return <FullScreenLoading />;
}
