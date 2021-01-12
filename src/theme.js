import { theme } from '@chakra-ui/core';
import React from 'react';
export default {
  ...theme,
  fonts: {
    ...theme.fonts,
    title: '"Roboto", sans-serif',
    body: '"Nunito", sans-serif'
  },
  icons: {
    ...theme.icons,
    menu: {
      path: <path fill="currentColor" d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"></path>,
      viewBox: "0 0 24 24"
    }
  }
};
