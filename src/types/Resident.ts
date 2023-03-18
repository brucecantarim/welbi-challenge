import { Attendance } from "./Attendance";

export interface Resident {
  id?: string;
  attendance?: Attendance[];
  applicantId?: number | null;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  roomNumber: string;
  status: string;
  ambulation: string;
  birthDate: string;
  levelOfCare: string;
  moveInDate: string;
}
