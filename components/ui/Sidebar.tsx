import type { NextPage } from "next";
import { useContext, useEffect, FC } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { AuthContext } from "../../context/auth";
import Logo from "../../public/img/logo.jpg";
import Image from "next/image";

export const Sidebar = ({ children }: { children: JSX.Element }) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div className="container px-0">
      <div className="d-flex" style={{ height: "calc(100vh - 58px)" }}>
        <div style={{ width: "280px" }}>
          <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100"
            style={{ width: "280px" }}
          >
            <div className="text-center bg-white">
              <Image src={Logo} alt="Logo" width={150} height={50} />
            </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <NextLink href="/" passHref>
                  <Link>
                    <Button color={"info"} className="nav-link d-block">
                      Inicio
                    </Button>
                  </Link>
                </NextLink>
              </li>
              <li className="nav-item">
                <NextLink href="/users" passHref>
                  <Link>
                    <Button color={"info"} className="nav-link d-block">
                      Usuarios
                    </Button>
                  </Link>
                </NextLink>
              </li>
            </ul>
            <hr />
            <div className="">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Image src={Logo} alt="Logo" width={100} height={50} />

                <strong className="ms-2">{user?.nombre}</strong>
              </a>
              <Link>
                <Button
                  color={"info"}
                  className="nav-link d-block text-center mt-4 mx-auto"
                  onClick={logout}
                >
                  Cerrar sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="px-2 w-100">{children}</div>
      </div>
    </div>
  );
};
