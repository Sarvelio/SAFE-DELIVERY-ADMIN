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
      <h1>Hola mundo</h1>
      <h1>SAFE DELIVERY ADMIN</h1>
      <div className="row">
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
