import { Attendance } from "./Attendance";

export interface Program {
  id?: string;
  recurrence?: string | null;
  attendance?: Attendance[];
  applicantId?: number | null;
  parentId?: number | null;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  location: string;
  start: string;
  end: string;
  allDay: boolean;
  isRepeated: boolean;
  dimension: string;
  facilitators: string[];
  hobbies: string[];
  tags: string[];
  levelOfCare: string;
}
