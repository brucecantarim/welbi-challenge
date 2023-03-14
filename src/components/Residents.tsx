import React from "react";

interface ResidentAttendance {
  programId: number;
  residentId: number;
  status: string;
}

export interface Resident {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  roomNumber: string;
  status: string;
  attendance: ResidentAttendance[];
  ambulation: string;
  applicantId: number | null;
  birthDate: string;
  levelOfCare: string;
  moveInDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ResidentsProps {
  residents: Partial<Resident>[];
  onSubmit: (type: string, name: string) => void;
}

const Residents: React.FC<ResidentsProps> = ({ residents }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-3xl text-white font-bold">Residents</div>
      {residents.map(({ id, name }) => (
        <div key={id} className="text-white">
          {name}
        </div>
      ))}
    </div>
  );
};

export default Residents;
