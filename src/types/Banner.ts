export interface Banner {
  bannerId: number,
  title: string,
  description?: string,
  image?: string,
  link?: string,
  targetProgram?: number,
  targetCategory?: number,

  createdAt: number,
  expiresAt?: number
}
