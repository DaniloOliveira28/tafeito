export type Tag = {
  color: string;
  etiqueta: string;
}

export type Anexo = {
  id: number;
  nome: string;
  tamanho: number;
  mime_type: string;
}

export type Task = {
  "id": number;
  "descricao": string;
  "concluida": boolean;
  "etiquetas": Tag[];
  "anexos": Anexo[];
  "id_categoria": number;
}

export type Category = {
  "id": number;
  "descricao": string;
}