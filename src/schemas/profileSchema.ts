import { z } from 'zod'

const ProfileFormSchema = z.object({
  flavors: z.object({
    sweet: z
      .number()
      .min(1, '맛에 대한 성향은 최소 1 이상 설정해주세요')
      .max(5),
    salty: z
      .number()
      .min(1, '맛에 대한 성향은 최소 1 이상 설정해주세요')
      .max(5),
    spicy: z
      .number()
      .min(1, '맛에 대한 성향은 최소 1 이상 설정해주세요')
      .max(5),
  }),
  pros: z
    .string()
    .min(10, '10자 이상 입력해주세요')
    .max(100, '100자 이내로 입력해주세요'),
  cons: z
    .string()
    .min(10, '10자 이상 입력해주세요')
    .max(100, '100자 이내로 입력해주세요'),
  profileImageUrl: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof ProfileFormSchema>

export { ProfileFormSchema, type ProfileFormValues }
