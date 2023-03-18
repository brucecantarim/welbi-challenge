import { useState, useEffect } from "react";

type ApiRequestConfig = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  type: "residents" | "programs";
  data?: any;
};

interface ApiHook {
  getResidents: () => Promise<any>;
  getPrograms: () => Promise<any>;
  createResident: (data: object) => Promise<any>;
  createProgram: (data: object) => Promise<any>;
  error: any;
}

interface Attendance {
  programId: number;
  residentId: number;
  status: string;
}

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

const useApi = (email: string): ApiHook => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [residents, setResidents] = useState<any>([]);
  const [programs, setPrograms] = useState<any>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchAuthToken = async () => {
      const response = await fetch("https://welbi.org/api/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await response.json();
      setAuthToken(data.authToken);
    };

    if (!authToken) {
      try {
        fetchAuthToken();
      } catch (error) {
        setError(error);
      }
    }
  }, [authToken]);

  const getTypeState = (type: ApiRequestConfig["type"]) => {
    let value, setValue;

    switch (type) {
      case "residents":
        value = residents;
        setValue = setResidents;
        break;
      case "programs":
        value = programs;
        setValue = setPrograms;
        break;
      default:
        value = null;
        setValue = null;
    }

    return [value, setValue];
  };

  const request = async ({ method, type, data }: ApiRequestConfig) => {
    try {
      const response = await fetch(`https://welbi.org/api/${type}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      const [value, setValue] = getTypeState(type);
      setValue && setValue([...value, responseData]);
      return responseData;
    } catch (error) {
      setError(error);
    }
  };

  const getValue = async (type: ApiRequestConfig["type"]) => {
    const [value, setValue] = getTypeState(type);

    if (value.length > 0) {
      return value;
    }
    const result = await request({ method: "GET", type: "residents" });
    setValue && setValue(result);
    return result;
  };

  const getResidents = async () => getValue("residents");
  const getPrograms = async () => getValue("programs");
  const createResident = async (data: object) =>
    request({ method: "POST", type: "residents", data });
  const createProgram = async (data: object) =>
    request({ method: "POST", type: "programs", data });

  return { getResidents, getPrograms, createResident, createProgram, error };
};

export default useApi;
