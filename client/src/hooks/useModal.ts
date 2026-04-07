import { useContext } from "react";
import { ModalContext } from "../layout/ModalProvider";

export const useModal = () => {
  const ctx = useContext(ModalContext);

  if (!ctx)
    throw new Error("useModal must be implemented instide ModalProvider");
  return ctx;
};
