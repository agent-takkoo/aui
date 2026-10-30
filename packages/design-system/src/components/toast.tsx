"use client";
import * as Primitive from "@radix-ui/react-toast";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { usePortalHost } from "../theme/provider.js";
import { Button, IconButton } from "./button.js";
import { Icon } from "./icon.js";
export type ToastOptions = {
  title: string;
  description?: string;
  tone?: "default" | "destructive";
  action?: { label: string; altText: string; onClick: () => void };
};
export type ToastProviderProps = { children: ReactNode; duration?: number };
type ToastApi = {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
};
const Context = createContext<ToastApi | null>(null);
export function ToastProvider({
  children,
  duration = 5000,
}: ToastProviderProps) {
  const host = usePortalHost();
  const nextId = useRef(0);
  const [items, setItems] = useState<
    (ToastOptions & { id: number; open: boolean })[]
  >([]);
  const toast = useCallback((options: ToastOptions) => {
    const id = ++nextId.current;
    setItems((current) => [
      ...current.filter((item) => item.open).slice(-2),
      { ...options, id, open: true },
    ]);
    return id;
  }, []);
  const dismiss = useCallback(
    (id: number) =>
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, open: false } : item,
        ),
      ),
    [],
  );
  return (
    <Context.Provider value={{ toast, dismiss }}>
      <Primitive.Provider
        duration={
          Number.isFinite(duration)
            ? Math.min(30000, Math.max(1000, duration))
            : 5000
        }
        swipeDirection="right"
      >
        {children}
        {host
          ? createPortal(
              <>
                {items.map((item) => (
                  <Primitive.Root
                    key={item.id}
                    className="ds-toast"
                    data-tone={item.tone ?? "default"}
                    open={item.open}
                    onOpenChange={(open) => {
                      if (!open) dismiss(item.id);
                    }}
                    onAnimationEnd={(event) => {
                      if (event.target === event.currentTarget && !item.open)
                        setItems((current) =>
                          current.filter((entry) => entry.id !== item.id),
                        );
                    }}
                  >
                    <div className="ds-toast-copy">
                      <Primitive.Title className="ds-toast-title">
                        {item.title}
                      </Primitive.Title>
                      {item.description ? (
                        <Primitive.Description className="ds-toast-description">
                          {item.description}
                        </Primitive.Description>
                      ) : null}
                    </div>
                    {item.action ? (
                      <div className="ds-toast-action">
                        <Primitive.Action asChild altText={item.action.altText}>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={item.action.onClick}
                          >
                            {item.action.label}
                          </Button>
                        </Primitive.Action>
                      </div>
                    ) : null}
                    <Primitive.Close asChild>
                      <IconButton
                        label="알림 닫기"
                        icon={<Icon name="close" />}
                      />
                    </Primitive.Close>
                  </Primitive.Root>
                ))}
                <Primitive.Viewport
                  className="ds-toast-viewport"
                  label="알림 ({hotkey})"
                />
              </>,
              host,
            )
          : null}
      </Primitive.Provider>
    </Context.Provider>
  );
}
export function useToast(): ToastApi {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "useToast는 ThemeProvider 안의 ToastProvider에서 사용하세요.",
    );
  return context;
}
