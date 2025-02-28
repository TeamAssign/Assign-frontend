import { z } from 'zod'

const ImageSchema = z.union([
  z.instanceof(File),
  z.string().url('사진을 입력해주세요'),
])

const ProfileFormSchema = z.object({
  flavors: z.object({
    sweet: z.number().min(0).max(5),
    salty: z.number().min(0).max(5),
    spicy: z.number().min(0).max(5),
  }),
  pros: z
    .string()
    .min(15, '15자 이상 입력해주세요')
    .max(100, '100자 이내로 입력해주세요'),
  cons: z
    .string()
    .min(15, '15자 이상 입력해주세요')
    .max(100, '100자 이내로 입력해주세요'),
  profileImageUrl: ImageSchema,
})

type ProfileFormValues = z.infer<typeof ProfileFormSchema>

export { ProfileFormSchema, type ProfileFormValues }
