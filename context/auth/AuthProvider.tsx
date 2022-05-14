import { FC, useReducer, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

import Cookies from "js-cookie";
// import axios from 'axios';

import { AuthContext, authReducer } from "./";

import { IUser } from "../../interfaces";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};
type IProps = {
  children: JSX.Element;
};
export const AuthProvider: FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
      setInitializing(false);
    } else if (status === "unauthenticated") {
      setInitializing(false);
    }
  }, [status, data]);

  const logout = () => {
    Cookies.remove("cart");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("zip");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");

    signOut({ redirect: false })
      .then(() => {
        dispatch({
          type: "[Auth] - Logout",
        });
      })
      .catch((error) => {
        console.log("--error--", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        initializing,

        // Methods
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
