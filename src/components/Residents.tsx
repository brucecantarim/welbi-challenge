import React from "react";
import { Resident } from "../types";

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
