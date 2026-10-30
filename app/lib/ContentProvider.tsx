"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteContent } from "./content";

const ContentContext = createContext<SiteContent | null>(null);

export function ContentProvider({ value, children }: { value: SiteContent; children: ReactNode }) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const c = useContext(ContentContext);
  if (!c) throw new Error("useContent doit être utilisé dans <ContentProvider>");
  return c;
}

/** Lien WhatsApp vers le numéro configuré, avec message pré-rempli optionnel. */
export function useWhatsapp() {
  const { whatsappIntl } = useContent().contact;
  return (text?: string) => `https://wa.me/${whatsappIntl}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
