export enum TipoSujeto {
  PERSONA = "persona",
  VEHICULO = "vehiculo",
}

export interface RespuestaBusqueda {
  solicitud_informacion_id: string;
  numero_caso: number;
  results: RespuestaSujeto[]
}

export interface RespuestaSujeto {
  tipo: TipoSujeto;
  sujeto: number;
  ci?: string;
  placa?: string;

  segip?: RespuestaSegip;

  sinarap?: RespuestaSinarap;

  itv?: RespuestaItv;

  anh?: RespuestaAnh;
}

export interface GenerateReport {
  usuario_id: string;
  numero_caso: number;
  justificacion: string;
}

export interface OwnerItv {
  categoria_licencia: string;
  documento_complemento: string;
  email: string;
  expedicion: string;
  fecha_nacimiento: string;
  fotografia: string;
  gestion: string;
  materno: string;
  nombre: string;
  nro_celular: string;
  nro_documento: string;
  owner_itv_id: string;
  paterno: string;
  sexo: string;
}

export interface RespuestaSegip {
  Fotografia: string;
  id: string;
  Complemento: string;
  Domicilio: string;
  EstadoCivil: string;
  FechaNacimiento: string | null;
  LugarNacimientoDepartamento: string;
  LugarNacimientoLocalidad: string;
  LugarNacimientoPais: string;
  LugarNacimientoProvincia: string;
  NombreCompletoConyuge: string;
  NombreCompletoMadre: string;
  NombreCompletoPadre: string;
  NumeroDocumento: string;
  ProcedenciaRegistro: string;
  Nombres: string;
  PrimerApellido: string;
  ProfesionOcupacion: string;
  SegundoApellido: string;
  ComplementoVisible: string;
  TipoRegistro: string;
  Genero: string;
  Nacionalidad: string;
  GrupoSanguineo: string;
  LugarExpedicion: string;
}

export interface DatosTecnicosItv {
  placa: string;
  marca: string;
  modelo: string;
  industria: string;
  clase: string;
  servicio: string;
  tipo_vehiculo: string;
  color: string;
  cilindrada: number;
  chasis: string;
  motor: string;
  radicatoria: string;
  fotografia: string;
}

export interface VehiculoAnh {
  identificadorAnh: string;
  chasis: string;
  placa: string;
  copiaPlaca: string;
  clase: string;
  marca: string;
  color: string;
  servicio: string;
  categoria: string;
  propietario: string;
  entidad: string;
  lugarRegistro: string;
  fechaRegistro: Date;
  fotoFrontal: string;
  fotoLateral: string;
  fotoPlaca: string;
  fotoTerceraPlaca: string;
  fotoChasis: string;
  fotoLicencia: string;
}

export interface CargaAnh {
  estacionServicio: string;
  nitEstacion: string;
  departamento: string;
  productor: string;
  razonSocial: string;
  nitConsumidor: string;
  factura: string;
  nroAutorizacion: string;
  codigoControl: string;
  cantidadLitros: number;
  monto: number;
  fechaVenta: Date;
  placa: string;
}

export interface RespuestaItv {
  datos_tecnicos?: DatosTecnicosItv;
  personas?: OwnerItv[];
}

export interface RespuestaAnh {
  vehiculo?: VehiculoAnh;
  cargas_combustible?: CargaAnh;
}

export interface RespuestaSinarap {
  numero_documento: string;
  complemento: string;
  nombres: string;
  paterno: string;
  materno?: string;
  fecha_nacimiento: Date;
  antecedentes: Antecedente[];
}

export interface Antecedente {
  fuente: 'FELCC' | 'FELCN' | 'TRANSITO';
  hecho: string | null;
  detalle: string | null;
  fecha: Date | null;
}