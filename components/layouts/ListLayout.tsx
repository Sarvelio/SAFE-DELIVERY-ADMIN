import { FC, useState } from "react";
import Head from "next/head";
import { Box, Button } from "@mui/material";
import NextLink from "next/link";
import {
  DataGrid,
  esES,
  GridToolbar,
  GridColDef,
  GridFilterModel,
  GridSelectionModel,
} from "@mui/x-data-grid";

interface Props {
  title: string;
  urlCreate?: string;
  titleCreate?: string;
  loading: boolean;
  columns: GridColDef[];
  data: [];
  refresh?: any;
  filterModel?: GridFilterModel;
  checkboxSelection?: boolean;
  setSelectionModel?: any;
  setOpen?: any;
  selectionModel?: GridSelectionModel;
}

export const ListLayout: FC<Props> = ({
  title,
  loading,
  data,
  columns,
  urlCreate,
  titleCreate = "Agregar",
  refresh,
  checkboxSelection = false,
  filterModel = { items: [] },
  setSelectionModel,
  setOpen,
  selectionModel = [],
}) => {
  return (
    <div className="container-web py-3 px-3 px-sm-4 px-md-2">
      <div className="row ">
        <div className="col-12 d-flex">
          <h3>{title}</h3>
        </div>
        {(urlCreate || refresh) && (
          <div className="col-12 d-flex">
            {refresh && (
              <>
                <span className="me-auto mb-3">
                  <button
                    type="button"
                    onClick={refresh}
                    className="btn bg-primary text-white px-4"
                  >
                    Refrescar
                  </button>
                </span>
              </>
            )}
            {urlCreate && (
              <span className="ms-auto mb-3">
                <NextLink href={urlCreate} passHref>
                  <button className="btn btn-warning px-4">
                    {titleCreate}
                  </button>
                </NextLink>
              </span>
            )}
          </div>
        )}
        {checkboxSelection && (
          <span className="me-auto mb-3">
            <button
              type="button"
              onClick={() => {
                setOpen(true);
              }}
              className="btn bg-secondary text-white px-4"
              disabled={selectionModel.length < 1}
            >
              Asignar Trasporte
            </button>
          </span>
        )}

        <div
          className="col-12 d-inline shadow px-0"
          style={{ height: "667px" }}
        >
          <DataGrid
            checkboxSelection={checkboxSelection}
            onSelectionModelChange={(newSelectionModel) => {
              if (checkboxSelection) {
                setSelectionModel(newSelectionModel);
              }
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            components={{
              Toolbar: GridToolbar,
            }}
            loading={loading}
            filterModel={filterModel}
          />
        </div>
      </div>
    </div>
  );
};
