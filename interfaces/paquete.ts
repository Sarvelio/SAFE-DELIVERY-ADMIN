import { Timestamp } from "firebase/firestore";
import { ITipoProducto } from "./tipoProducto";
import { IUsuario } from "./user";

export interface ICliente {
  nombre: string;
  departamento: string;
  municipio: string;
  direccion: string;
  telefono: string;
}

export interface IPaquete {
  peso: string;
  tipoProducto: ITipoProducto;
  emisor: ICliente;
  receptor: ICliente;

  transportista?: IUsuario;
  totalPagar: number;
  estado: string;

  fechaEnRuta?: Timestamp;
  fechaEntregado?: Timestamp;
}
