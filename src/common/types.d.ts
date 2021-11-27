export type Task = {
  "id": number;
  "descricao": string;
  "concluida": boolean;
  "etiquetas": string[];
  "anexos": string[];
  "id_categoria": number;
}

export type Category = {
  "id": number;
  "descricao": string;
}