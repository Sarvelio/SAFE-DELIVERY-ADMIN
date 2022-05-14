import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../context/";

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
    return (
      <div className="  bg-danger" style={{ width: "400px", height: "300px" }}>
        <h1>Application Loading</h1>
      </div>
    );
  } else {
    if (user) {
      if (!lockedAfterLogin) {
        return <>{children}</>;
      }
    } else {
      if (!requireAuth) {
        return <>{children}</>;
      }
    }
  }
  return null;
}
