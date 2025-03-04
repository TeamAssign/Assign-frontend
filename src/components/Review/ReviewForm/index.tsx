import CancelCircleIcon from '@/assets/icons/cancel-circle.svg?react'
import ImageIcon from '@/assets/icons/image-icon.svg?react'
import {
  Avatar,
  Button,
  Input,
  RadioGroups,
  SearchDropDown,
  TextArea,
} from '@/components'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FOOD_CATEGORIES } from '@/constant'
import useGetUsersList from '@/hooks/apis/user/useGetUsersList'
import useSearchMember from '@/hooks/useSearchMember'
import { cn } from '@/lib/utils'
import { ReviewFormSchema, ReviewFormValues } from '@/schemas/reviewSchema'
import { Participant } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface ReviewFormProps {
  isEditMember: boolean
  type?: string
  recommendationId?: number
  menu?: string
  imgUrl?: string
  comment?: string
  category?: string
  participants?: Participant[]
}

const ReviewForm = ({
  isEditMember,
  recommendationId,
  type,
  menu,
  participants,
  category,
  comment,
  imgUrl,
}: ReviewFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...(recommendationId && { recommendationId }),
      type: type || '',
      menu: menu || '',
      reviewImg: null,
      comment: comment || '',
      category: category || '',
      star: 0,
      participants: participants || [],
    },
    resolver: zodResolver(ReviewFormSchema),
  })

  const { data } = useGetUsersList()
  const allUsers = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page.content)
  }, [data])

  const {
    ref,
    members,
    searchInput,
    searchMemberList,
    isOpenMemberDropDown,
    handleMemberInputChange,
    handleSelectMember,
    handleDeleteMember,
  } = useSearchMember(allUsers, participants)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [previewImg, setPreviewImg] = useState<string>(imgUrl || '')

  const rating = watch('star')

  useEffect(() => {
    setValue('participants', members)
  }, [members, setValue])

  const handleClickSubmit = (data: ReviewFormValues) => {
    console.log(data)
  }

  const handleStarClick = (index: number) => {
    setValue('star', index + 1)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]
    if (imageFile) {
      const fileReader = new FileReader()

      fileReader.onloadend = () => {
        setPreviewImg(fileReader.result as string)
      }

      fileReader.readAsDataURL(imageFile)
      setValue('reviewImg', imageFile)
    } else {
      setPreviewImg('')
      setValue('reviewImg', null)
    }
  }

  return (
    <section className='w-full p-4'>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(handleClickSubmit)}
      >
        <div className='flex flex-col gap-2'>
          <h1 className='font-semibold text-sub-2'>식사 유형</h1>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <RadioGroups
                isEdit={isEditMember}
                defaultType={type}
                onChange={field.onChange}
              />
            )}
          />
          {type === '' && errors.type && (
            <p className='font-semibold text-red-500 text-description'>
              {errors.type.message}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='font-semibold text-sub-2'>후기 사진</h1>
          <div className='flex items-center w-full gap-4'>
            {previewImg && (
              <div className='w-24 h-24 '>
                <img
                  className='object-cover w-full h-full rounded-md border-[1px] border-light-gray'
                  src={previewImg}
                  alt='후기 사진'
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
              {...register('reviewImg')}
              ref={fileInputRef}
              className='hidden'
              type='file'
              accept='image/*'
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='font-semibold text-sub-2'>먹은 사람 등록</h1>
          {isEditMember && (
            <div className='relative'>
              <Input
                placeholder='이름을 검색해주세요'
                value={searchInput}
                className='focus:outline-none focus:border-black'
                onChange={handleMemberInputChange}
              />
              <SearchDropDown
                ref={ref}
                isOpen={isOpenMemberDropDown}
                onClick={handleSelectMember}
                memberList={searchMemberList}
              />
            </div>
          )}

          <div className='flex items-center gap-4 overflow-x-auto whitespace-nowrap '>
            {members.map((member) => (
              <div className='relative py-2' key={member.id}>
                <Avatar
                  imgUrl={member.profileImageUrl}
                  text={member.name}
                  name={member.name}
                  department={member.teamName}
                />
                {isEditMember && (
                  <CancelCircleIcon
                    onClick={() => handleDeleteMember(member.id)}
                    className='absolute top-0 cursor-pointer -right-2'
                  />
                )}
              </div>
            ))}
          </div>
          {members.length === 0 && errors.participants && (
            <p className='font-semibold text-red-500 text-description'>
              {errors.participants.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='font-semibold text-sub-2'>메뉴 명</h1>
          <Input
            {...register('menu')}
            defaultValue={menu}
            disabled={!!menu}
            placeholder='메뉴 명을 입력해주세요.'
            className='focus:outline-none focus:border-black'
          />
        </div>
        {errors.menu && (
          <p className='font-semibold text-red-500 text-description'>
            {errors.menu.message}
          </p>
        )}

        <div className='flex flex-col gap-2'>
          <h1 className='font-semibold text-sub-2'>카테고리</h1>
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <Select
                disabled={!!category}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className='w-[180px] border-[1px] border-dark-gray'>
                  <SelectValue placeholder='음식 카테고리를 설정해주세요' />
                </SelectTrigger>
                <SelectContent className='border-[1px] border-dark-gray bg-white z-50'>
                  <SelectGroup>
                    <SelectLabel>카테고리</SelectLabel>
                    {FOOD_CATEGORIES.map((category) => (
                      <SelectItem
                        className='text-main-black hover:bg-light-gray'
                        key={category}
                        value={category}
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className='font-semibold text-red-500 text-description'>
              {errors.category.message}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='font-semibold text-sub-2'>후기</h1>
          <TextArea
            {...register('comment')}
            placeholder='후기를 등록 입력해주세요.'
            className='focus:outline-none focus:border-black'
          />
          {errors.comment && (
            <p className='font-semibold text-red-500 text-description'>
              {errors.comment.message}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='font-semibold text-sub-2'>별점</h1>
          <div className='flex'>
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                onClick={() => handleStarClick(index)}
                className={cn(
                  'w-10 h-10 cursor-pointer',
                  rating > index ? 'text-yellow-400 ' : 'text-gray-300',
                )}
              >
                ★
              </div>
            ))}
          </div>
          <input {...register('star')} type='hidden' value={rating} />
          {rating === 0 && errors.star && (
            <p className='font-semibold text-red-500 text-description'>
              {errors.star.message}
            </p>
          )}
        </div>
        <Button type='submit'>후기 작성 완료</Button>
      </form>
    </section>
  )
}

export default ReviewForm
