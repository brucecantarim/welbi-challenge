import React, { useState, useEffect } from "react";
import EmailForm from "./components/EmailForm";
import Programs, { Program } from "./components/Programs";
import Residents, { Resident } from "./components/Residents";

const App: React.FC = () => {
  const [authToken, setAuthToken] = useState("");
  const [programs, setPrograms] = useState<Partial<Program>[]>([]);
  const [residents, setResidents] = useState<Partial<Resident>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authToken) {
      const fetchProgramsData = async () => {
        setIsLoading(true);
        const response = await fetch("https://welbi.org/api/programs", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setPrograms(data);
      };

      const fetchResidentsData = async () => {
        const response = await fetch("https://welbi.org/api/residents", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setResidents(data);
        setIsLoading(false);
      };

      try {
        fetchProgramsData();
        fetchResidentsData();
      } catch (error) {
        console.error(error);
      }
    }
  }, [authToken]);

  const handleCreate = async (type: string, name: string) => {
    // These are all the required fields I identified for the API
    // Haven't added all of them to the UI due to time constraints
    const requiredFields = {
      isRepeated: false,
      hobbies: [],
      levelOfCare: ["INDEPENDENT"],
      facilitators: ["UNKNOWN"],
      dimension: "UNKNOWN",
      tags: [],
      allDay: false,
      location: "UNKNOWN",
      start: "2021-01-01T00:00:00.000Z",
      end: "2021-01-01T00:00:00.000Z",
    };

    const response = await fetch(`https://welbi.org/api/${type}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...requiredFields,
        name,
      }),
    });
    const data = await response.json();
    setPrograms([...programs, data]);
  };

  return (
    <main className="grid place-items-center w-screen h-screen bg-blue-500">
      <h2 className="text-4xl text-white font-bold">Welbi FE Challenge</h2>
      {!authToken && <EmailForm onSuccess={setAuthToken} />}
      {isLoading && <div className="text-white">Loading...</div>}
      {!isLoading && programs.length > 1 && residents.length > 1 && (
        <div className="flex gap-20">
          <Programs programs={programs} onSubmit={handleCreate} />
          <Residents residents={residents} onSubmit={handleCreate} />
        </div>
      )}
      {!authToken && (
        <footer className="flex flex-col gap-2 w-6/12 text-white">
          <strong>Considerations</strong>
          <p>
            This is a very basic implementation of the API requests in a React /
            Typescript / Tailwind application. After inputing your email, you
            will receive an authorization token that will be used to make
            requests to the API.
          </p>
          <p>
            Then, you will be able to see a list of programs and residents, and
            create new programs. Due to time constraints, I am allowing the
            creation of new programs, but not residents, as the UI for that
            would required more time for the implementation and testing. As for
            the programs, you are able to create them only using the name field,
            while the other required fields are set to default values.
          </p>
          <p>
            Given more time, I would have implemented the UI for creating new
            residents, and I would have added more fields to the UI for creating
            new programs. I would also have moved the API request and state
            management to a custom hook, and I would have implemented a more
            robust error handling and loading animation handling system.
          </p>
          <p>Oh, and by the way, I love Community too.</p>
          <p>Let me know if you have any questions! Thanks!</p>
          <em>- Bruce</em>
        </footer>
      )}
    </main>
  );
};

export default App;
