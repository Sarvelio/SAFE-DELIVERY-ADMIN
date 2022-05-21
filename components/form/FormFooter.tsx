import React from "react";
interface IProps {
  errorData: string;
  editar: boolean;
  setOpen: any;
  loadingCUD: boolean;
  _navigateTo: () => void;
  onlyRead?: boolean;
}

const FormFooter = ({
  errorData,
  editar,
  loadingCUD,
  _navigateTo,
  setOpen,
  onlyRead = false,
}: IProps) => {
  return (
    <>
      {errorData && (
        <div className="alert alert-danger mt-2 mb-0" role="alert">
          {errorData}
        </div>
      )}
      {!onlyRead && editar && (
        <button
          className="btn btn-outline-danger mx-0 my-2 px-4"
          type="button"
          disabled={loadingCUD}
          onClick={() => {
            setOpen(true);
          }}
        >
          Eliminar registro
        </button>
      )}
      <div className="d-grid gap-2 d-sm-block text-center">
        <button
          className="btn btn-secondary mx-sm-2 mt-2 px-4 "
          type="button"
          disabled={loadingCUD}
          style={{ minWidth: 150 }}
          onClick={_navigateTo}
        >
          {onlyRead ? "Salir" : "Cancelar"}
        </button>
        {!onlyRead && (
          <button
            className="btn btn-warning mx-sm-2 mt-2 px-4 "
            type="submit"
            disabled={loadingCUD}
            style={{ minWidth: 150 }}
          >
            {editar ? "Editar" : "Guardar"}
          </button>
        )}
      </div>
    </>
  );
};

export default FormFooter;
