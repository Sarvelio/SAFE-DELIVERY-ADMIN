import type { NextPage } from "next";
import React, { useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
  esES,
} from "@mui/x-data-grid";
import { useFirebase } from "../../firebase";

import NextLink from "next/link";
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

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 250 },
  { field: "nombre", headerName: "Nombre" },
  { field: "edad", headerName: "Edad" },
];
const ListPage: NextPage = () => {
  const { data, loading } = useFirebase({
    _collection: "usuarios",
    read: true,
  });
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-12 d-flex">
          <span className="ms-auto my-3">
            <NextLink href="/users/create" passHref>
              <Link>
                <Button color={"info"}>Crear usuario</Button>
              </Link>
            </NextLink>
          </span>
        </div>
        <div
          className="col-12 d-inline bg-light shadow px-0"
          style={{ height: "667px" }}
        >
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            components={{
              Toolbar: GridToolbar,
            }}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPage;
