import { Patient } from "../lib/api";

export default function PatientData(props: {
  patient?: Patient;
  children: (name: string, value: string) => JSX.Element;
}) {
  if (!props.patient) return <></>;

  const fields = [
    ["Name", `${props.patient.firstName} ${props.patient.lastName}`],
    ["Date of birth", new Date(props.patient.dateOfBirth).toLocaleDateString()],
    ["NHS Number", props.patient.nhsNumber],
    ["Phone Number", props.patient.phoneNumber],
  ];

  return <>{fields.map(([name, value]) => props.children(name, value))}</>;
}
