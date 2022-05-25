import { ISucursal } from "./sucursal";
export interface IUsuario {
  nombre: string;
  telefono: string;
  departamento: string;
  municipio: string;
  direccion: string;
  correo: string;
  contrasena: string;
  rol: string;
  sucursal?: ISucursal;

  id?: string;
}
