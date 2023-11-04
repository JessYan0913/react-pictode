import { useContext } from 'react';

import { PictodeContext } from '../components/Pictode';
import { PictodeContextType } from '../types';

export const usePictode = (componentName: string): PictodeContextType => {
  const pictode = useContext(PictodeContext);
  if (!pictode) {
    throw new Error(`<${componentName} /> is missing a parent <Pictode /> component.`);
  }
  return pictode;
};
