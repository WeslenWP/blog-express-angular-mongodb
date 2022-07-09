export interface ICategoria {
  _id: string,
  nome: string,
  slug: string,
  data: Date,
}

export interface IAddCategoria {
  nome: string,
  slug: string,
}
