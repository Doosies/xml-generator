import { useState } from "react";

export const useInput = <T>(initialState:T) => {
  const [value, setValue] = useState(initialState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value as unknown as T);
  };
  return { value, onChange };
}