import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectBoxProps {
  placeholder: string
  values: { teamId: number; teamName: string }[]
  label: string
  defaultValue?: string
  onChange: (value: string) => void
}

/**
 * 
 * @param
 * placehoder
 * values: SelectBox에 들어갈 컨텐츠
 * label
 * defaultValue: 기본적으로 내가 속한 팀
 * onChange: selectBox change 핸들러
 *
 * @example
 * const Parent = () => {
 *  const { teamId } = useParams()
 *  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(teamId);
 *  const navigate = useNavigate()
 *  
 *  const handleSelectChange = (value: string) => {
    setSelectedTeam(value)
    navigate(`/teams/${value}`)
    ... 추가 로직
    }
 * 
 *  <SelectBox
         placeholder='팀을 선택해주세요.'
         values={teams}
         onChange={handleSelectChange}
         defaultValue={selectedTeam}
         label='Teams'
       />
 * }
 * 
 * 
 */

const SelectBox = ({
  placeholder,
  values,
  onChange,
  defaultValue,
  label,
}: SelectBoxProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className='w-[180px] border-[1px] border-dark-gray'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className='border-[1px] border-dark-gray bg-white z-10'>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {values.map((value) => (
            <SelectItem
              className='text-main-black hover:bg-light-gray'
              key={value.teamId}
              value={String(value.teamId)}
            >
              {value.teamName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectBox
