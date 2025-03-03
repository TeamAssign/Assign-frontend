// DTO에 해당되는 타입들 여기로 분리
export type TeamResponse = {
  id: number
  name: string
}

export type PostUserProps = {
  name: string
  teamName: string
  spicy: number
  salty: number
  sweet: number
  pros: string
  cons: string
}

export type PostAcceptMenuType = {
  type: string
  name: string
  accuracy: number
  participantIds?: number[]
}
