export interface Permiso {
    id: string;

    descripcion: string;
    su: boolean;
    grupo_id: number;
    grupo:Grupo;
  }
  
  export interface Grupo {
    id: number;
    nombre: string;
  }