import {
  GraficaPieEstadoPaquetes,
  GraficaBarMensual,
  GraficaLineDiaria,
  GraficaPieTIpoPaquete,
} from "../grafica/";

import { CreateLayout } from "../layouts";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { TYPE_ROLES } from "../../utils/roles";

export function MainGrafica() {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <CreateLayout title={`"¡Bienvenido ${user?.nombre}!"`}>
      <div className="container-web-card ">
        <hr />
        <div className="row">
          <div className="my-3 col-sm-6">
            <h4>Hoy</h4>
            <div
              style={{ maxHeight: "250px", maxWidth: "250px" }}
              className="text-center"
            >
              <GraficaPieEstadoPaquetes />
            </div>
          </div>
          {user?.rol != TYPE_ROLES.transportista && (
            <>
              <div className="my-3 col-sm-6">
                <h4>Semana actual</h4>
                <div style={{ maxHeight: "550px", maxWidth: "550px" }}>
                  <GraficaLineDiaria />
                </div>
              </div>

              <div className="my-3 col-sm-6">
                <h4>Acumulación por mes</h4>
                <div style={{ maxHeight: "500px", maxWidth: "500px" }}>
                  <GraficaBarMensual />
                </div>
              </div>
              <div className="my-3 col-sm-6">
                <h4>Tipos de prodcuto mes actual:</h4>
                <div style={{ maxHeight: "250px", maxWidth: "250px" }}>
                  <GraficaPieTIpoPaquete />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </CreateLayout>
  );
}
