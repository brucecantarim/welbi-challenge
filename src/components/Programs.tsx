import React, { useState } from "react";
import { Program } from "../types";

interface ProgramsProps {
  programs: Partial<Program>[];
  onSubmit: (type: string, name: string) => void;
}

const Programs: React.FC<ProgramsProps> = ({ programs, onSubmit }) => {
  const [create, setCreate] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    setCreate(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit("programs", inputValue);
    setInputValue("");
    setCreate(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-3xl text-white font-bold">Programs</div>
      {programs.map(({ id, name }) => (
        <div key={id} className="text-white">
          {name}
        </div>
      ))}
      {!create && (
        <button
          className="inline-block rounded bg-white px-6 pt-2.5 pb-2 text-xs
          font-medium uppercase leading-normal text-black
          shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out
          hover:bg-primary-600
          hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
          focus:bg-primary-600
          focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
          focus:outline-none focus:ring-0 active:bg-primary-700
          active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          onClick={handleClick}
        >
          New Program
        </button>
      )}
      {create && (
        <form
          className="flex flex-col bg-gray-300 text-black gap-2 p-4 rounded"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <input
            className="text-black rounded p-2 mb-4"
            type="text"
            name="name"
            value={inputValue}
            onChange={handleInputChange}
            required
          />

          <button
            className="inline-block rounded bg-blue-500 px-6 pt-2.5 pb-2 text-xs
          font-medium uppercase leading-normal text-white
          shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out
          hover:bg-primary-600
          hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
          focus:bg-primary-600
          focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
          focus:outline-none focus:ring-0 active:bg-primary-700
          active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            type="submit"
          >
            Create
          </button>
        </form>
      )}
    </div>
  );
};

export default Programs;
