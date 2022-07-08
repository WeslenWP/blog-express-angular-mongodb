export interface ICategoria {
  _id: string,
  nome: string,
  slug: string,
  date?: Date,
}

export interface IAddCategoria {
  nome: string,
  slug: string,
}
