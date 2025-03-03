export type Participant = {
  id: number
  name: string
  teamName: string
  profileImageUrl: string
}

export type FlavorValues = {
  sweet: number
  spicy: number
  salty: number
}

export type ChartValues = {
  [key: string]: number
}

export type MenuStoreValues = {
  name: string
  distance: string
  address: string
  placeUrl: string
  imageUrl: string
  phone?: string
}

export type UserInfoType = {
  id: number
  name: string
  profileImageUrl: string
  teamId: number
  teamName: string
}

export type TeamType = {
  id: number
  name: string
}
