import React, { useState, useEffect } from "react";

interface EmailProps {
  onSuccess: (token: string) => void;
}

const EmailForm: React.FC<EmailProps> = ({ onSuccess: setAuthToken }) => {
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event && event.preventDefault();
    setEmail(inputValue);
  };

  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        setIsLoading(true);
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
        setAuthToken(data.token);
        setIsLoading(false);
      };

      try {
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  }, [email, setAuthToken]);

  return (
    <div className="flex flex-col gap-2">
      {!isLoading && (
        <>
          <header className="font-bold text-white">
            Enter your email to begin:
          </header>
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              className="text-black px-4 py-2 rounded"
              type="email"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputEnter}
              required
            />
            <button
              className="inline-block rounded bg-white px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              type="submit"
            >
              Submit
            </button>
          </form>
        </>
      )}
      {isLoading && <div className="text-white">Authenticating...</div>}
    </div>
  );
};

export default EmailForm;
