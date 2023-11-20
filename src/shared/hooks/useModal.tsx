
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import React from 'react'


interface ModalContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  openModal: () => void;
  closeModal: () => void;
  idObject: any;
  setIdObject: Dispatch<SetStateAction<any>>;
  title: string;
  setTitle: (value: string) => void;
  Subtitle: string;
  setSubTitle: (value: string) => void;
  listOpen:any;
  setListOpen: (value:any) => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext({} as ModalContextProps);

export function ModalProvider({children}: ModalProviderProps) {
  const [open, setOpen] = useState(false);
  const [idObject, setIdObject] = useState(null);
  const [title, setTitle] = useState('');
  const [Subtitle, setSubTitle] = useState('');
  const [listOpen, setListOpen] = useState([]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setIdObject(null);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        openModal,
        closeModal,
        idObject,
        setIdObject,
        setTitle,
        title,
        Subtitle,
        setSubTitle,
        listOpen,
        setListOpen,
      }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
