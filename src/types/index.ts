export type Participant = {
  id: number
  name: string
  team: string
  profileImage: string
}

export type FlavorValues = {
  sweet: number
  spicy: number
  salty: number
}

export type ChartValues = {
  [key: string]: number
}
