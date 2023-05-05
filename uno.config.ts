import presetRemToPx from '@unocss/preset-rem-to-px';
import { defineConfig, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      primary: '#13c2c2',
      tip: '#A3AAB2',
      error: '#ff4d4f',
    },
  },
  presets: [
    presetUno(),
    presetRemToPx({ baseFontSize: 4 }),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        cursor: 'pointer',
        width: '20px',
        height: '20px',
        'vertical-align': '-0.205em',
      },
    }),
  ],
  shortcuts: {
    btn: 'text-white text-14 bg-primary rounded-10 cursor-pointer px-8 py-2',
    red: 'text-red-100',
    text: 'text-primary cursor-pointer text-14',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex flex-col justify-center items-center',
    'icon-add': 'i-ic:round-add-circle-outline',
    'icon-delete': 'i-ic:outline-delete',
  },
});
