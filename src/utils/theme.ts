/* eslint-disable max-len */
import { Tuple } from 'src/utils/types';

export const customColors: Record<string, Tuple<string, 10>> = {
  dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5c5f66', '#373A40', '#2C2E33', '#25262b', '#1A1B1E', '#141517', '#101113'],

  gray: ['#F1F3F5', '#ECEEF0', '#E6E8EB', '#DFE3E6', '#D7DBDF', '#C1C8CD', '#889096', '#7E868C', '#687076', '#11181C'],

  red: ['#FEF0F5', '#FEE7EF', '#FDD8E5', '#FCC5D8', '#FAA8C5', '#F881AB', '#F31260', '#B80A47', '#910838', '#4E041E'],

  pink: ['#FFF0FB', '#FFE5F8', '#FFD6F3', '#FFC2EE', '#FFA3E5', '#FF7AD9', '#FF4ECD', '#D6009A', '#B80084', '#4D0037'],

  grape: ['#f8f0fc', '#f3d9fa', '#eebefa', '#e599f7', '#da77f2', '#cc5de8', '#be4bdb', '#ae3ec9', '#9c36b5', '#862e9c'],

  violet: [
    '#f3f0ff',
    '#e5dbff',
    '#d0bfff',
    '#b197fc',
    '#9775fa',
    '#845ef7',
    '#7950f2',
    '#7048e8',
    '#6741d9',
    '#5f3dc4',
  ],

  indigo: [
    '#edf2ff',
    '#dbe4ff',
    '#bac8ff',
    '#91a7ff',
    '#748ffc',
    '#5c7cfa',
    '#4c6ef5',
    '#4263eb',
    '#3b5bdb',
    '#364fc7',
  ],

  blue: ['#EDF5FF', '#E1EFFF', '#CEE4FE', '#B7D5F8', '#96C1F2', '#5EA2EF', '#0072F5', '#005FCC', '#004799', '#00254D'],

  cyan: ['#F0FCFF', '#E6FAFE', '#D7F8FE', '#C3F4FD', '#A5EEFD', '#7EE7FC', '#06B7DB', '#09AACD', '#0E8AAA', '#053B48'],

  teal: ['#e6fcf5', '#c3fae8', '#96f2d7', '#63e6be', '#38d9a9', '#20c997', '#12b886', '#0ca678', '#099268', '#087f5b'],

  green: ['#F1FDF7', '#E8FCF1', '#DAFBE8', '#C8F9DD', '#ADF5CC', '#88F1B6', '#17C964', '#13A452', '#108944', '#06371B'],

  lime: ['#f4fce3', '#e9fac8', '#d8f5a2', '#c0eb75', '#a9e34b', '#94d82d', '#82c91e', '#74b816', '#66a80f', '#5c940d'],

  yellow: [
    '#FEF9F0',
    '#FEF5E7',
    '#FDEFD8',
    '#FCE7C5',
    '#FBDBA7',
    '#F9CB80',
    '#F5A524',
    '#B97509',
    '#925D07',
    '#4E3104',
  ],

  orange: [
    '#fff4e6',
    '#ffe8cc',
    '#ffd8a8',
    '#ffc078',
    '#ffa94d',
    '#ff922b',
    '#fd7e14',
    '#f76707',
    '#e8590c',
    '#d9480f',
  ],
  purple: [
    '#F7F2FD',
    '#F1E8FB',
    '#EADCF8',
    '#E0CBF5',
    '#D1B1F0',
    '#BC8EE9',
    '#7828C8',
    '#6622AA',
    '#4D1980',
    '#290E44',
  ],
  text: ['#E9F7F7', '#E0F1F3', '#C3E1E8', '#8EB0BA', '#536C76', '#11181C', '#0C1318', '#080E14', '#050A10', '#03070D'],
};

export const customTheme = {
  dir: 'ltr',
  primaryShade: {
    light: 6,
    dark: 8,
  },
  focusRing: 'auto',
  loader: 'oval',
  dateFormat: 'MMMM D, YYYY',
  colorScheme: 'light',
  white: '#fff',
  black: '#000',
  defaultRadius: 'sm',
  transitionTimingFunction: 'ease',
  colors: customColors,
  lineHeight: 1.55,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  primaryColor: 'blue',
  respectReducedMotion: true,
  cursorType: 'default',
  defaultGradient: {
    from: 'red',
    to: 'yellow',
    deg: 45,
  },

  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
    md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
    xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px',
  },

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },

  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
  },

  spacing: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },

  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
  },

  headings: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
    fontWeight: 700,
    sizes: {
      h1: { fontSize: 34, lineHeight: 1.3, fontWeight: undefined },
      h2: { fontSize: 26, lineHeight: 1.35, fontWeight: undefined },
      h3: { fontSize: 22, lineHeight: 1.4, fontWeight: undefined },
      h4: { fontSize: 18, lineHeight: 1.45, fontWeight: undefined },
      h5: { fontSize: 16, lineHeight: 1.5, fontWeight: undefined },
      h6: { fontSize: 14, lineHeight: 1.5, fontWeight: undefined },
    },
  },

  other: {},
  components: {},
  activeStyles: { transform: 'translateY(1px)' },
  datesLocale: 'en',
};
