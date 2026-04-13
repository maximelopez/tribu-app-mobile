declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  import React from 'react';
  const content: React.FC<SvgProps>;
  export default content;
}

// Déclaration pour les fichiers .css
declare module '*.css';
declare module './global.css';
