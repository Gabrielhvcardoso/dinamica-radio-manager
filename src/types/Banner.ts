export interface Banner {
  bannerId: number,
  title: string,
  description?: string,
  image?: string,
  link?: string,
  program?: null | {
    programId: number,
    programTitle: string,
    prigramImage: string
  },
  category?: null | {
    categoryId: number,
    categoryName: string
  },

  createdAt: number,
  expiresAt?: number
}
