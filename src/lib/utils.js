import { clsx } from 'clsx';

import { twMerge } from 'tailwind-merge';

export default function cn(...input) {
    const inputs = input
  return twMerge(clsx(inputs));
}
