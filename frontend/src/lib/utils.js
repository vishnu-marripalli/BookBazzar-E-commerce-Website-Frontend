import { clsx } from 'clsx';

import { twMerge } from 'tailwind-merge';

export default function cn(...input) {
    const inputs = input
    console.log(inputs)
  return twMerge(clsx(inputs));
}
