import {
  GraficaPieEstadoPaquetes,
  GraficaBarMensual,
  GraficaLineDiaria,
  GraficaPieTIpoPaquete,
} from "../components/grafica/";
import { CreateLayout } from "../components/layouts";

function App() {
  return (
    <CreateLayout title="!Bienvenido Alex!">
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
        </div>
      </div>
    </CreateLayout>
  );
}

export default App;
