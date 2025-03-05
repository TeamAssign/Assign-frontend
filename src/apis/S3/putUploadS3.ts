import axios from 'axios'

export const uploadToS3 = async (presignedUrl: string, file: File) => {
  try {
    const response = await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    })
    return response
  } catch (e) {
    console.error(e)
  }
}
