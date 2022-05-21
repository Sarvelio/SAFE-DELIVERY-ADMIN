import { FC } from "react";
import Head from "next/head";
import { Box, Button } from "@mui/material";
import NextLink from "next/link";
import { DataGrid, esES, GridToolbar, GridColDef } from "@mui/x-data-grid";

interface Props {
  title: string;
  children: JSX.Element;
  onlyRead?: boolean;
}

export const CreateLayout: FC<Props> = ({
  title,
  children,
  onlyRead = false,
}) => {
  return (
    <div className="container-web py-3 px-3 px-sm-4 px-md-2">
      <div className="row ">
        <div className="col-12 d-flex">
          <h3>{title}</h3>
        </div>
        <div
          className="col-12 d-inline shadowg px-0 position-relative"
          style={{ height: "667px" }}
        >
          {onlyRead && (
            <div
              className="position-absolute w-100 h-100"
              style={{ zIndex: 1 }}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
