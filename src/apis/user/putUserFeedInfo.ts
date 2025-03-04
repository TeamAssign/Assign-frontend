import { ProfileFormValues } from '@/schemas/profileSchema'
import { axiosInstance } from '../axiosInstance'

export const putUserFeedInfo = async (data: ProfileFormValues) => {
  const submitData = {
    spicy: data.flavors.spicy,
    salty: data.flavors.salty,
    sweet: data.flavors.sweet,
    pros: data.pros,
    cons: data.cons,
    profileImageUrl: data.profileImageUrl,
  }

  try {
    await axiosInstance.put(`/users/profile`, submitData)
  } catch (e) {
    console.error(e)
  }
}
