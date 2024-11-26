'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select" 
import { Textarea } from "./textarea"
import { Checkbox } from "./checkbox"

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps {
  control: Control<any>
  fieldType: FormFieldType
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field:any) => React.ReactNode,
}

const RenderField = ({ field, props }: {field:any; props: CustomProps }) => {
  const {fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton, children} = props;
  
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dar-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              value={field.value || ''} // Ensure value is never undefined
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
      
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value || ''} // Ensure value is never undefined
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
      
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>
            <DatePicker 
              selected={field.value || null}
              onChange={(date: Date | null) => field.onChange(date)}
              dateFormat={dateFormat ?? 'MM/dd/yyyy'} 
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
              isClearable 
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} value={field.value || ''}>
          <FormControl>
            <SelectTrigger className="w-full h-11 bg-dark-400 border border-dark-500 px-4 py-3">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="bg-dark-400 border border-dark-500 p-4">
            {children}
          </SelectContent>
        </Select>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            value={field.value || ''} // Ensure value is never undefined
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            className="w-full h-24 bg-dark-400 border-0 focus:ring-0 focus:outline-none resize-none p-2"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center">
            <Checkbox
              id={props.name}
              checked={field.value || false} // Ensure value is never undefined
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    default:
      return null;
  }
}

const CustomFormField = (props: CustomProps) => {
  const {control, fieldType, name, label} = props;
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;