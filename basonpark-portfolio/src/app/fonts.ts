import { NextFont } from 'next/dist/compiled/@next/font';
import localFont from 'next/font/local';

// Define the Verona Serial font
export const veronaSerial = localFont({
  src: [
    {
      path: '../../src/fonts/Verona-Serial-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../src/fonts/Verona-Serial-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-verona-serial',
});

// Lexend Font Configuration (Removed)
/*
export const lexend = localFont({
  src: [
    {
      path: '../../public/fonts/Lexend-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Lexend-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Lexend-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Lexend-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-lexend',
});
*/
