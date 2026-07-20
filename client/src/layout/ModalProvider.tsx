"use client";

import {
  ComponentType,
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { createPortal } from "react-dom";

export type ModalProps = {
  close: () => void;
  [key: string]: unknown;
};

type ModalEntry = {
  id: string;
  component: ComponentType<ModalProps>;
  props: Record<string, unknown>;
};

const reducerFn = (
  state: ModalEntry[],
  action: { type: "PUSH"; entry: ModalEntry } | { type: "POP"; id: string },
) => {
  if (action.type === "PUSH") return [...state, action.entry];
  if (action.type === "POP") return state.filter((e) => e.id !== action.id);
  return state;
};

type ModalContextType = {
  open: <P extends Record<string, unknown>>(
    component: ComponentType<P & ModalProps>,
    props?: Omit<P, "close">,
  ) => void;
  close: (id: string) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [stack, dispatch] = useReducer(reducerFn, []);

  const open = useCallback(
    <P extends Record<string, unknown>>(
      component: ComponentType<ModalProps & P>,
      props: Omit<P, "close"> = {} as Omit<P, "close">,
    ) => {
      const id = Math.random().toString(36).slice(2);
      dispatch({
        type: "PUSH",
        entry: { id, component: component as ComponentType<ModalProps>, props },
      });
    },
    [],
  );

  const close = useCallback((id: string) => {
    dispatch({ type: "POP", id });
  }, []);

  useEffect(() => {
    document.body.style.overflow = stack.length ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stack.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && stack.length) close(stack[stack.length - 1].id);
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [stack, close]);

  return (
    <ModalContext.Provider value={{ open, close }}>
      <ModalStack stack={stack} close={close} />

      {children}
    </ModalContext.Provider>
  );
};

export const ModalStack = ({
  stack,
  close,
}: {
  stack: ModalEntry[];
  close: (id: string) => void;
}) => {
  if (!stack.length) return null;
  return createPortal(
    <div
      // onClick={() => close(stack[stack.length - 1].id)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      {stack.map((entry, i) => {
        const Comp = entry.component;
        const depth = stack.length - 1 - i;
        const isTop = i === stack.length - 1;

        return (
          <div
            key={entry.id}
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 50 + i * 2 }}
          >
            {/* Backdrop for every modal except the first */}
            {i > 0 && (
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => {
                  if (isTop) close(entry.id);
                }}
              />
            )}

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative min-w-80 max-w-[90vw] max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
              style={{
                zIndex: 51 + i * 2,
                transform: `translateY(-${depth * 12}px) scale(${1 - depth * 0.05})`,
                transformOrigin: "top center",
                animation: isTop
                  ? "modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1)"
                  : "none",
              }}
            >
              <Comp {...entry.props} close={() => close(entry.id)} />
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>,
    document.body,
  );
};
