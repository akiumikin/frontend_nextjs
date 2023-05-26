import * as React from 'react'
import { SelectField, Sizes } from '@aws-amplify/ui-react';

interface Props {
  setState: any
  label?: string
  size?: Sizes
  variation?: 'quiet'
  descriptiveText?: React.ReactNode
  isDisabled?: boolean
  placeholder?: string
  defaultValue?: string
  options: { label: string, value: string }[]
}

export default function Field(props: Props) {

  const onChangeHundle = (e: any) => {
    props.setState(e.target.value)
    // props.setState
  }

  return (
    <SelectField
      label={props.label}
      size={props.size}
      variation={props.variation}
      descriptiveText={props.descriptiveText}
      errorMessage={''}
      labelHidden={!!props.label}
      isDisabled={props.isDisabled}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      onChange={(e) => onChangeHundle(e)}
    >
      {props.options.map((option: { label: string, value: string }, idx: number) => {
        return(
          <option key={`${props.label}_${idx+1}`} value={option.value}>
            {option.label}
          </option>
        )
      })}
    </SelectField>
  )
}
