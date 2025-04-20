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
