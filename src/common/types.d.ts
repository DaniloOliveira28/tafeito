export type Tag = {
  color: string;
  etiqueta: string;
}

export type Task = {
  "id": number;
  "descricao": string;
  "concluida": boolean;
  "etiquetas": Tag[];
  "anexos": string[];
  "id_categoria": number;
}

export type Category = {
  "id": number;
  "descricao": string;
}