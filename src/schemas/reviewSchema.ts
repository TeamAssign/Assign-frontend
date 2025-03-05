import { z } from 'zod'

const ParticipantSchema = z.object({
  id: z.number(),
  name: z.string(),
  teamName: z.string(),
  profileImageUrl: z.string(),
})

const ReviewFormSchema = z.object({
  recommendationId: z.number().nullable(),
  type: z.string().min(1, '식사 유형 선택은 필수입니다'),
  menu: z.string().min(1, '메뉴명은 필수입니다'),
  reviewImg: z.string().min(1, '리뷰 이미지는 필수입니다'),

  comment: z.string().min(1, '후기는 필수입니다'),
  category: z.string().min(1, '카테고리는 필수입니다'),
  star: z
    .number()
    .min(1, '별점은 최소 1점 이상이어야 합니다')
    .max(5, '별점은 최대 5점까지 가능합니다'),
  participants: z.array(ParticipantSchema),
})

type ReviewFormValues = z.infer<typeof ReviewFormSchema>

export { ReviewFormSchema, type ReviewFormValues }
