import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// This line was removed because getDictionary might be called from client components: import 'server-only';

const dictionaries = {
  en: () => import('@/locales/en.json').then(module => module.default),
  vi: () => import('@/locales/vi.json').then(module => module.default),
};

export type Locale = keyof typeof dictionaries;

// This function can now be called from client components after removing 'server-only'
// Ensure the dynamic imports work correctly in a client context.
// If issues arise, consider alternative i18n setups or passing the dictionary via props/context.
export const getDictionary = async (locale: Locale) => dictionaries[locale]();


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
