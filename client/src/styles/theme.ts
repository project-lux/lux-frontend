const weight = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
}

const font = {
  weight,
  size: {
    normal: '1em',
  },
  desktop: {
    h1: {
      weight: weight.extraLight,
      size: '3.1em',
      lineHeight: '72px',
    },
    h2: {
      weight: weight.extraLight,
      size: '2rem',
      lineHeight: '56px',
    },
    h3: {
      weight: weight.light,
      size: '1.5em',
      lineHeight: '40px',
    },
    h4: {
      weight: weight.bold,
      size: '24px',
      lineHeight: '32px',
    },
    h5: {
      weight: weight.medium,
      size: '24px',
      lineHeight: '32px',
    },
    h6: {
      weight: weight.bold,
      size: '20px',
      lineHeight: '24px',
    },
    bodyRegular: {
      weight: weight.regular,
      size: '16px',
      lineHeight: '24px',
    },
    bodyLight: {
      weight: weight.light,
      size: '16px',
      lineHeight: '24px',
    },
    tabNavigation: {
      weight: weight.bold,
      size: '16px',
      lineHeight: '24px',
    },
  },
  mobile: {
    h1: {
      weight: weight.extraLight,
      size: '40px',
      lineHeight: '48px',
    },
    h2: {
      weight: weight.extraLight,
      size: '1.5em',
      lineHeight: '40px',
    },
    h3: {
      weight: weight.extraLight,
      size: '1.25em',
      lineHeight: '30px',
    },
    h4: {
      weight: weight.medium,
      size: '18px',
      lineHeight: '26px',
    },
    h5: {
      weight: weight.bold,
      size: '16px',
      lineHeight: '24px',
    },
    bodyRegular: {
      weight: weight.regular,
      size: '16px',
      lineHeight: '24px',
    },
    bodyLight: {
      weight: weight.light,
      size: '16px',
      lineHeight: '24px',
    },
  },
}

const color = {
  black: '#222',
  black20: 'rgba(0, 0, 0, 0.2)',
  black65: 'rgba(0, 0, 0, 0.65)',
  borderShadow: '#d9d9d9',
  button: '#767676',
  darkBlue60: 'rgba(0, 53, 107, 0.6)', // 60% primary.darkBlue
  dangerRed: '#C21F2F',
  dangerRed60: 'rgba(194, 31, 47, 0.6)',
  teal90: 'rgb(0, 123, 148, 0.9)', // 90% primary.teal
  gray: '#999',
  lightBabyBlue: '#E7F1FF',
  lightGray: '#E1DFDF',
  link: '#286DC0',
  offWhite: '#F7F7F7',
  white: '#FFF',
  tabButtonBgColor: '#C2C2C2',
  errorFg: 'FC0D1B',
  errorBg: '#FFF0F0',
  trueBlack: '#000',
  barChartGreen: '#46813B',
  barChartPurple: '#6b58A6',

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

  graphs: {
    itemProductionDate: {
      focused: '#AD1457',
      unFocused: 'rgba(173, 20, 87, 0.2)',
    },
    itemEncounteredDate: {
      focused: '#6A1B9A',
      unFocused: 'rgba(106, 27, 154, 0.2)',
    },
    itemIncludedDate: {
      focused: '#283593',
      unFocused: 'rgba(40, 53, 147, 0.2)',
    },
    workPublicationDate: {
      focused: '#8D6E63',
      unFocused: 'rgba(141, 110, 99, 0.2)',
    },
    workCreationDate: {
      focused: '#2E7D32',
      unFocused: 'rgba(46, 125, 50, 0.2)',
    },
    workGeneratedBy: {
      focused: '#00838F',
      unFocused: 'rgba(0, 131, 143, 0.2)',
    },
    workCreationOrPublicationDate: {
      focused: '#000000',
      unFocused: 'rgba(0, 0, 0, 0.2)',
    },
    setAboutDate: {
      focused: '#2D60B4',
      unFocused: 'rgba(45, 96, 180, 0.2)',
    },
    setCausedByDate: {
      focused: '#283593',
      unFocused: 'rgba(40, 53, 147, 0.2)',
    },
    setCreationDate: {
      focused: '#700370',
      unFocused: 'rgba(112, 3, 112, 0.2)',
    },
    setPublicationDate: {
      focused: '#6e6e6e',
      unFocused: 'rgba(110, 110, 110, 0.2)',
    },
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
  tabPaddingX: '10px',

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
