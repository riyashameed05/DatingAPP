export interface Member {
  displayName: string
  id: string
  dateOfBirth: string
  imageUrl?: string
  created: string
  lastActive: string
  gender: string
  description?: string
  city: string
  country: string
}

export interface Photo {
  id: number
  url: string
  publicId?: string
  memberId: string
}