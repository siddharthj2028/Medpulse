"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import SubmitButton from "../ui/SubmitButton";
import CustomFormField from "../ui/CustomFormField";
import { FormFieldType } from "../ui/CustomFormField";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";

export const AppointmentForm = ({userId, patientId,type}:
    {userId: string; patientId: string; type: "create" | "cancel"}
) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    console.log('Form submitted with values:', values);
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      console.log('Attempting to create user:', user);

      const newUser = await createUser(user);
      console.log('Created user:', newUser)

      if (newUser) {
        console.log('Redirecting to:', `/patients/${newUser.$id}/register`);
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }

    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">request anappointment.</p>
        </section>

        {type !== "cancel" && (
          <>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician" showTimeSelect={false} >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          
          <CustomFormField 
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="appointment date" showTimeSelect dateFormat="MM/dd/yyyy - h:mm aa" >
          </CustomFormField>

          <div>
            <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="reason for appointment"
                placeholder="Enter reason for appointment" showTimeSelect={false}>
            </CustomFormField>
          </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="reason for cancellation"
            placeholder="Enter reason for cancellation" showTimeSelect={false}>
          </CustomFormField>
        )}
        
        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`} children={undefined}        >
        </SubmitButton>
      </form>
    </Form>
  );
};