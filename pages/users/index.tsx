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
import { ListLayout } from "../../components";
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
    <ListLayout
      title="Usuario"
      loading={loading}
      columns={columns}
      data={data}
      urlCreate="/users/create"
    />
  );
};

export default ListPage;
