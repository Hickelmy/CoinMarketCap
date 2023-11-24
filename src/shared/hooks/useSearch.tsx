/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useState } from "react";

export interface SearchProps {
  column: string;
  value: any;
}

interface SearchContextData {
  obj: SearchProps | undefined;
  setObj: (valor: SearchProps) => void;
  clearSearch: boolean;
  setClear: (value: boolean) => void;
  isFilled: boolean;
  resetSearchProvider: () => void;
}

interface SearchProviderProps {
  children: ReactNode;
}
const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export function SearchProvider({ children }: SearchProviderProps) {
  const [obj, setObj] = useState<SearchProps>();
  const [clearSearch, setClear] = useState(false);
  const isFilled = Boolean(obj?.column && obj?.value);
  const resetSearchProvider = () => {
    setObj({ column: "", value: "" });
  };

  return (
    <SearchContext.Provider
      value={{
        obj,
        setObj,
        clearSearch,
        setClear,
        isFilled,
        resetSearchProvider,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
