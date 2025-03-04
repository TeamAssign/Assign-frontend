import { ProfileFormValues } from '@/schemas/profileSchema'
import { axiosInstance } from '../axiosInstance'

export const putTeamFoodInfo = async (id: string, data: ProfileFormValues) => {
  const submitData = {
    spicy: data.flavors.spicy,
    salty: data.flavors.salty,
    sweet: data.flavors.sweet,
    pros: data.pros,
    cons: data.cons,
  }
  console.log(submitData, id)
  try {
    await axiosInstance.put(`/teams/${id}/profile`, submitData)
  } catch (e) {
    console.error(e)
  }
}
