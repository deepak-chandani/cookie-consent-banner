import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function addScript(src: string) {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript';
  script.onload = () => console.log(`${src} has been loaded successfully.`);
  document.head.appendChild(script);
}