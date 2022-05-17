import type { NextPage } from "next";
import { useContext, useEffect, FC, useState } from "react";
import NextLink from "next/link";
import { AuthContext } from "../../context/auth";
import Logo from "../../public/img/logo.jpg";
import Image from "next/image";
import { MenuOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  ListSubheader,
} from "@mui/material";
import { useRouter } from "next/router";

export const Sidebar = ({ children }: { children: JSX.Element }) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(true);
  const { asPath } = useRouter();

  const urls = [
    { path: "/", name: "Inicio" },
    { path: "/users", name: "Usuarios" },
    { path: "/Hola", name: "Hola" },
  ];
  const validpath = (path: string) => {
    if (path === "/") {
      return path === asPath;
    }
    console.log("asPath", asPath);
    console.log("path", path);
    return asPath.startsWith(path);
  };
  return (
    <div className="container-web mx-auto px-0">
      <div
        className="d-flex bg-movil position-relative "
        style={{ minHeight: "calc(100vh - 58px)" }}
      >
        <div
          style={{
            width: "280px",
            minHeight: "calc(100vh - 58px) ",
          }}
          className={`d-none d-md-block ${openMenu ? "sidebar-active" : ""}`}
        >
          <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-blue h-100 "
            style={{ width: "280px" }}
          >
            <div className="text-center bg-white">
              <Image src={Logo} alt="Logo" width={150} height={50} />
            </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              {urls.map(({ path, name }) => (
                <li
                  className={`nav-item  ${
                    validpath(path) ? "nav-active" : "nav-not-active"
                  }`}
                  key={path + name}
                >
                  <NextLink href={path} passHref>
                    <Button className="d-block pt-3 pb-2">{name}</Button>
                  </NextLink>
                </li>
              ))}
            </ul>
            <hr />
            <div className="">
              <strong className="ms-2">{user?.nombre}</strong>
              <div className="d-grid gap-2">
                <button
                  className="btn text-danger mt-3"
                  type="button"
                  onClick={logout}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100" style={{ background: "#f6f6f6" }}>
          <div className="d-md-none d-flex bg-blue">
            <span
              className="ms-auto p-2 bg-blue text-white"
              onClick={() => {
                setOpenMenu(true);
              }}
            >
              <MenuOutlined sx={{ fontSize: 35, fill: "white" }} />
            </span>
          </div>
          <div
            className=" w-100 container-web p-2 p-sm-3 p-md-4"
            style={{ background: "#f6f6f6" }}
          >
            {children}
          </div>
        </div>
        <div
          className={` position-absolute h-100 w-100 d-none  ${
            openMenu ? "sidebar-lock" : ""
          }`}
          onClick={() => {
            setOpenMenu(false);
          }}
          style={{ background: "#00000038" }}
        ></div>
      </div>
    </div>
  );
};
