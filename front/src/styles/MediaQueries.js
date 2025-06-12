import { css } from 'styled-components';

const breakpoints = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1400px',
};
export const media = {
  xs: (...arges) => css`
    @media (min-width: ${breakpoints.xs}) {
      ${css(...arges)}
    }
  `,
  sm: (...arges) => css`
    @media (min-width: ${breakpoints.sm}) {
      ${css(...arges)}
    }
  `,
  md: (...arges) => css`
    @media (min-width: ${breakpoints.md}) {
      ${css(...arges)}
    }
  `,
  lg: (...arges) => css`
    @media (min-width: ${breakpoints.lg}) {
      ${css(...arges)}
    }
  `,
  xl: (...arges) => css`
    @media (min-width: ${breakpoints.xl}) {
      ${css(...arges)}
    }
  `,
  '2xl': (...arges) => css`
    @media (min-width: ${breakpoints['2xl']}) {
      ${css(...arges)}
    }
  `,
};
