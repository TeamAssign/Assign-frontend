import { axiosInstance } from '../axiosInstance'

// interface User {
//   id: number
//   name: string
//   teamName: string
//   profileImageUrl: string
// }

// interface PageInfo {
//   currentPage: number
//   hasNextPage: boolean
//   hasPrevPage: boolean
//   size: number
//   totalElements: number
//   totalPages: number
// }

// interface ApiResponse {
//   message: string
//   content: User[]
//   pageInfo: PageInfo
//   timestam: string
// }

export const getUsersList = async ({ pageParam = 1 }) => {
  try {
    const response = await axiosInstance.get(
      `/users/search?page=${pageParam}&size=7`,
    )
    return response.data.data
  } catch (e) {
    console.error(e)
    throw e
  }
}
