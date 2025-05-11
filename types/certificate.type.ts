export interface Certificate {
  cid: string
  issuedBy: string
  name: string
  courseName?: string
  grade?: number
  description?: string
  image: string
  issuedAt: number
}
