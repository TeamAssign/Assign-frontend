import AvatarComponents from '@/components/ui/avatarExam'

const { AvatarExam, AvatarFallback, AvatarImage } = AvatarComponents

interface AvatarProps {
  imgUrl: string
  text: string
  name?: string
  department?: string
}

const Avatar = ({ imgUrl, text, name, department }: AvatarProps) => {
  return (
    <div className='flex flex-col items-center justify-center max-w-18'>
      <AvatarExam>
        <AvatarImage src={imgUrl} />
        <AvatarFallback>{text}</AvatarFallback>
      </AvatarExam>
      {name && <div className='pt-2 font-semibold text-center'>{name}</div>}
      {department && (
        <div className='text-gray-500 text-subbody text-desciption'>
          {department}
        </div>
      )}
    </div>
  )
}

export default Avatar
