import { axiosInstance } from '../axiosInstance'

export const getPreSignedURL = async (file: File) => {
  const submitData = {
    fileName: file.name,
    contentType: file.type,
    contentLength: file.size,
  }
  try {
    const response = await axiosInstance.post('/images/upload', submitData)
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}
