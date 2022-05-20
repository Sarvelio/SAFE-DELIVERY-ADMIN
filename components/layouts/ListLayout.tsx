import { FC } from "react";
import Head from "next/head";
import { Box, Button } from "@mui/material";
import NextLink from "next/link";
import { DataGrid, esES, GridToolbar, GridColDef } from "@mui/x-data-grid";

interface Props {
  title: string;
  urlCreate?: string;
  titleCreate?: string;
  loading: boolean;
  columns: GridColDef[];
  data: [];
}

export const ListLayout: FC<Props> = ({
  title,
  loading,
  data,
  columns,
  urlCreate,
  titleCreate = "Agregar",
}) => {
  return (
    <div className="container-web py-3 px-3 px-sm-4 px-md-2">
      <div className="row ">
        <div className="col-12 d-flex">
          <h3>{title}</h3>
        </div>
        {urlCreate && (
          <div className="col-12 d-flex">
            <span className="ms-auto mb-3">
              <NextLink href={urlCreate} passHref>
                <button className="btn btn-warning px-4">{titleCreate}</button>
              </NextLink>
            </span>
          </div>
        )}
        <div
          className="col-12 d-inline shadow px-0"
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
