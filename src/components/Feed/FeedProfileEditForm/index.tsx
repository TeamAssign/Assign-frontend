import ImageIcon from '@/assets/icons/image-icon.svg?react'
import { Button, FlavorStatItem, TextArea } from '@/components'
import { FlavorValues } from '@/types'
import { ChangeEvent, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface FeedProfileEditFormProps {
  type: 'team' | 'person'
  sweet: number
  spicy: number
  salty: number
  pros: string
  cons: string
  profileImageUrl?: string
}

interface ReviewFormValues {
  flavors: FlavorValues
  pros: string
  cons: string
  profileImageUrl: File | string
}

const FeedProfileEditForm = ({
  type,
  sweet,
  spicy,
  salty,
  pros,
  cons,
  profileImageUrl,
}: FeedProfileEditFormProps) => {
  const { control, handleSubmit, register, setValue } =
    useForm<ReviewFormValues>({
      defaultValues: {
        flavors: {
          sweet: sweet || 0,
          spicy: spicy || 0,
          salty: salty || 0,
        },
        pros: pros || '',
        cons: cons || '',
        profileImageUrl: profileImageUrl || '',
      },
    })

  const [previewImg, setPreviewImg] = useState<string>(profileImageUrl || '')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleClickSubmit = (data: ReviewFormValues) => {
    console.log(data)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]
    if (imageFile) {
      const fileReader = new FileReader()

      fileReader.onloadend = () => {
        setPreviewImg(fileReader.result as string)
      }

      fileReader.readAsDataURL(imageFile)
      setValue('profileImageUrl', imageFile)
    } else {
      setPreviewImg('')
      setValue('profileImageUrl', '')
    }
  }

  return (
    <section className='w-full p-4'>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(handleClickSubmit)}
      >
        {type === 'person' && (
          <div className='flex flex-col gap-2'>
            <span className='text-title text-sub-2 font-bold'>
              프로필 이미지 수정
            </span>
            <div className='w-full flex items-center gap-4'>
              {previewImg && (
                <div className=' w-24 h-24'>
                  <img
                    className='object-cover w-full h-full rounded-full border-[1px] border-light-gray'
                    src={previewImg}
                    alt='프로필 이미지'
                  />
                </div>
              )}
              {!previewImg && (
                <div className='object-cover w-24 h-24 rounded-md border-[1px] border-light-gray'></div>
              )}
              <button
                type='button'
                className='w-12 h-12 text-white bg-main-black border-[1px] bg-main-color rounded-md cursor-pointer flex items-center justify-center'
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon />
              </button>
              <input
                {...register('profileImageUrl')}
                ref={fileInputRef}
                className='hidden'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}

        <div className='flex flex-col gap-2'>
          <span className='text-title text-sub-2 font-bold'>🍽️ 음식 성향</span>
          <Controller
            name='flavors'
            control={control}
            render={({ field }) => (
              <div className='space-y-6'>
                <FlavorStatItem
                  defaultValue={field.value.sweet}
                  type='sweet'
                  label='단 맛'
                  onValueChange={(type, value) => {
                    field.onChange({
                      ...field.value,
                      [type]: value,
                    })
                  }}
                />
                <FlavorStatItem
                  defaultValue={field.value.salty}
                  type='salty'
                  label='짠 맛'
                  onValueChange={(type, value) => {
                    field.onChange({
                      ...field.value,
                      [type]: value,
                    })
                  }}
                />
                <FlavorStatItem
                  defaultValue={field.value.spicy}
                  type='spicy'
                  label='매운 맛'
                  onValueChange={(type, value) => {
                    field.onChange({
                      ...field.value,
                      [type]: value,
                    })
                  }}
                />
              </div>
            )}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-title text-sub-2 font-bold'>
            😃 이런 음식은 좋아요!
          </span>
          <TextArea
            {...register('pros')}
            placeholder='좋아하는 음식 성향을 이야기해주세요!'
            className='focus:outline-none focus:border-black'
          />
        </div>
        <div>
          <span className='text-title text-sub-2 font-bold'>
            ☹️ 이런 음식은 싫어요!
          </span>
          <TextArea
            {...register('cons')}
            placeholder='싫어하는 음식 성향을 이야기해주세요!'
            className='focus:outline-none focus:border-black'
          />
        </div>

        <Button type='submit'>후기 작성 완료</Button>
      </form>
    </section>
  )
}

export default FeedProfileEditForm
