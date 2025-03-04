import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const EAT_TYPES_LIST = ['혼밥', '그룹', '회식']

interface RadioGroupsType {
  isEdit: boolean
  defaultType?: string
  onChange: () => void
}

const RadioGroups = ({ defaultType, isEdit, onChange }: RadioGroupsType) => {
  return (
    <RadioGroup
      disabled={!isEdit}
      className='flex items-center gap-8'
      defaultValue={defaultType || EAT_TYPES_LIST[0]}
      onChange={onChange}
    >
      {EAT_TYPES_LIST.map((type, index) => (
        <div key={`${type}-${index}`} className='flex items-center space-x-2'>
          <RadioGroupItem className='' value={type} id={type} />
          <Label htmlFor={type}>{type}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}

export default RadioGroups
