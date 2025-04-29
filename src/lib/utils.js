import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import 'remixicon/fonts/remixicon.css';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
