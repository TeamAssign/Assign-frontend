import ImageIcon from '@/assets/icons/image-icon.svg?react'
import { Button, FlavorStatItem, TextArea } from '@/components'
import usePutTeamFeedInfo from '@/hooks/apis/team/usePutTeamFeedInfo'
import usePutUserFeedInfo from '@/hooks/apis/user/usePutUserFeedInfo'
import { ProfileFormSchema, ProfileFormValues } from '@/schemas/profileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

interface FeedProfileEditFormProps {
  type: 'team' | 'person'
  sweet: number
  spicy: number
  salty: number
  pros: string
  cons: string
  profileImageUrl?: string
  onClose: (status: boolean) => void
}

const FeedProfileEditForm = ({
  type,
  sweet,
  spicy,
  salty,
  pros,
  cons,
  profileImageUrl,
  onClose,
}: FeedProfileEditFormProps) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      flavors: {
        sweet: sweet || 0,
        spicy: spicy || 0,
        salty: salty || 0,
      },
      pros: pros || '',
      cons: cons || '',
      ...(profileImageUrl ? { profileImageUrl } : {}),
    },
    resolver: zodResolver(ProfileFormSchema),
  })

  const [previewImg, setPreviewImg] = useState<string>(profileImageUrl || '')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { teamId } = useParams()
  const { mutate: putTeamFeed, status: putTeamInfoStatus } = usePutTeamFeedInfo(
    teamId || '',
  )
  const { mutate: putUserFeed, status: putUserInfoStatus } =
    usePutUserFeedInfo()

  const handleClickSubmit = (data: ProfileFormValues) => {
    if (type === 'team') {
      putTeamFeed(data)
    }
    if (type === 'person') {
      putUserFeed(data)
    }
  }

  useEffect(() => {
    if (putTeamInfoStatus === 'success' || putUserInfoStatus === 'success') {
      onClose(false)
    }
  }, [putTeamInfoStatus, putUserInfoStatus, onClose])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]
    if (imageFile) {
      const fileReader = new FileReader()

      fileReader.onloadend = () => {
        setPreviewImg(fileReader.result as string)
      }

      fileReader.readAsDataURL(imageFile)
      //setValue('profileImageUrl', imageFile)
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
            <span className='font-bold text-title text-sub-2'>
              프로필 이미지 수정
            </span>
            <div className='flex items-center w-full gap-4'>
              {previewImg && (
                <div className='w-24 h-24 '>
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
          <span className='font-bold text-title text-sub-2'>🍽️ 음식 성향</span>
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
                {errors.flavors?.sweet && (
                  <p className='font-semibold text-red-500 text-description'>
                    {errors.flavors.sweet.message}
                  </p>
                )}

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
                {errors.flavors?.salty && (
                  <p className='font-semibold text-red-500 text-description'>
                    {errors.flavors.salty.message}
                  </p>
                )}

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
                {errors.flavors?.spicy && (
                  <p className='font-semibold text-red-500 text-description'>
                    {errors.flavors.spicy.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-bold text-title text-sub-2'>
            😃 이런 음식은 좋아요!
          </span>
          <TextArea
            {...register('pros')}
            placeholder='좋아하는 음식 성향을 이야기해주세요!'
            className='focus:outline-none focus:border-black'
          />
          {errors.pros && (
            <p className='font-semibold text-red-500 text-description'>
              {errors.pros.message}
            </p>
          )}
        </div>
        <div>
          <span className='font-bold text-title text-sub-2'>
            ☹️ 이런 음식은 싫어요!
          </span>
          <TextArea
            {...register('cons')}
            placeholder='싫어하는 음식 성향을 이야기해주세요!'
            className='focus:outline-none focus:border-black'
          />
          {errors.cons && (
            <p className='font-semibold text-red-500 text-description'>
              {errors.cons.message}
            </p>
          )}
        </div>

        <Button type='submit'>프로필 수정 완료</Button>
      </form>
    </section>
  )
}

export default FeedProfileEditForm
