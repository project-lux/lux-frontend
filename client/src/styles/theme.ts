// Font parameters here are for "Inter" font
const font = {
  size: {
    normal: '1em',
  },
  weight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
}

const color = {
  black: '#222',
  black20: 'rgba(0, 0, 0, 0.2)',
  black65: 'rgba(0, 0, 0, 0.65)',
  borderShadow: '#d9d9d9',
  button: '#767676',
  darkBlue60: 'rgba(0, 53, 107, 0.6)', // 60% primary.darkBlue
  teal90: 'rgb(0, 123, 148, 0.9)', // 90% primary.teal
  gray: '#999',
  lightGray: '#E1DFDF',
  offWhite: '#F7F7F7',
  white: '#FFF',
  link: '#286DC0',
  tabButtonBgColor: '#E4E4E4',
  errorFg: 'FC0D1B',
  errorBg: '#FFF0F0',
  trueBlack: '#000',

  // Primary colors defined by POW design
  primary: {
    blue: '#006DC6',
    darkBlue: '#00356B',
    teal: '#007B94',
  },

  // Secondary colors defined by POW design
  secondary: {
    aeroBlue: '#CDEAD5',
    lightBlue: '#AAD3DF',
    pacificBlue: '#00B5CA',
    cornflowerBlue: '#8095E8',
  },

  advancedSearch: {
    addRowText: '#979797',
  },
  // Background color outside section panels
  offPanel: '#F7F7F7',
}

const spacing = {
  // Left-most and right-most gutter for sections
  sectionAbsMarginX: '12px',

  // To offset the default Bootstrap container/col padding of 12px
  cancelDefaultPadding: '-12px',

  // Absolute distance from the left edge of the window,
  // of the location where typical text of the outermost section begins
  // contentAbsMarginX: '40px',
  contentAbsMarginX: '37px',

  // Vertical gap between sections
  sectionGap: '16px',
  landingPageSectionGap: '24px',

  // Horizontal padding of section inside container
  // = contentAbsMarginX + cancelDefaultPadding
  // = 40px - 12px = 28px
  // sectionPaddingX: '28px',
  sectionPaddingX: '25px',

  // Spacing between line items
  verticalItemSingleSpacing: '0.5rem',
  verticalItemDoubleSpacing: '1rem',
}

const breakpoints = {
  xs: 576,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
}

const border = {
  radius: '8px',
}

const colWidths = {
  keyClass: 'col-12 col-sm-4 col-md-12 col-lg-4 col-xl-3',
  valueClass: 'col-12 col-sm-8 col-md-12 col-lg-8 col-xl-9',
}

const theme = {
  color,
  font,
  spacing,
  border,
  breakpoints,
  colWidths,

  searchBox: {
    width: '816px',
    borderRadius: '24px',
  },

  landingPage: {
    sectionPaddingTop: '37px',
    heroImageSection: {
      minHeight: '440px',
    },
  },

  contentPage: {
    headerGap: '32px', // gap between title (h1) and body
    footerGap: '64px', // gap between body and footer

    h2: {
      fontSize: '3em',
      fontWeight: font.weight.extraLight,
      letterSpacing: 0,
      lineHeight: '56px',
      color: color.black,
      marginBottom: '15px',
    },
    ul: {
      paddingLeft: '32px',
    },
  },

  faqPage: {
    h1: {
      paddingY: '33px',
    },
    h2: {
      paddingY: '1rem',
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.5em',
      fontWeight: font.weight.bold,
      lineHeight: '80px',
    },
    // Distance between accordions column and the sidebar
    columnsGap: '24px',
  },
}

export default theme
