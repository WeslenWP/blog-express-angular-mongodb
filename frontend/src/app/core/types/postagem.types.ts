import { ICategoria } from "./categoria.types"

export interface IPostagem {
  _id: string,
  titulo: string,
  slug: string,
  descricao: string,
  conteudo: string,
  categoria: ICategoria,
  data: Date
}

export interface IAddPostagem {
  titulo: string,
  descricao: string,
  conteudo: string,
  categoria: string
}
