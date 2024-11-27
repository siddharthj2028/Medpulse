import { Button } from "@/components/ui/button";
import { PatientForm } from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
import App from "next/app";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

export default async function NewAppointment({params: { userId}}: SearchParamProps) {
    const patient = await getPatient(userId);
    return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between" >
          <Image
           src="/assets/icons/Med.png"
           height={1000}
           width={100}
           alt="patient"
           className="mb-12 h-100 w-fit"
          />

          <AppointmentForm 
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="justify-tems-end text-dark-600 xl:text-left">
          © 2024 MedPulse 
          </p>
        </div>
      </section>

      <Image 
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[50%] "
      />
    </div>
  );
}
