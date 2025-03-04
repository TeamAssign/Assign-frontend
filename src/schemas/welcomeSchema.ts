import { z } from 'zod'

const WelcomeSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요' }),
  teamName: z.string().min(1, { message: '팀을 선택해주세요' }),

  sweet: z
    .number()
    .min(1, { message: '맛에 대한 성향은 최소 1 이상 설정해주세요' })
    .max(5),
  salty: z
    .number()
    .min(1, { message: '맛에 대한 성향은 최소 1 이상 설정해주세요' })
    .max(5),
  spicy: z
    .number()
    .min(1, { message: '맛에 대한 성향은 최소 1 이상 설정해주세요' })
    .max(5),

  pros: z
    .string()
    .min(10, { message: '10자 이상 입력해주세요' })
    .max(100, { message: '100자 이내로 입력해주세요' }),
  cons: z
    .string()
    .min(10, { message: '10자 이상 입력해주세요' })
    .max(100, { message: '100자 이내로 입력해주세요' }),
})

type WelcomeFormValues = z.infer<typeof WelcomeSchema>

export { WelcomeSchema, type WelcomeFormValues }
