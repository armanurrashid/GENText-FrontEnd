import { createContext } from "vm";

interface ContextType {
    file_id: number | undefined;
  }
  
  const defaultValue: ContextType = {
    file_id: undefined,
  };

export const ActivityDrawerContext = createContext(defaultValue);