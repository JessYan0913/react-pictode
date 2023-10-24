import { useContext } from 'react';

import { PictodeContext } from '../Pictode';
import { PictodeContextType } from '../Pictode/types';

export const usePictode = (componentName: string): PictodeContextType => {
  const pictode = useContext(PictodeContext);
  if (!pictode) {
    throw new Error(`<${componentName} /> is missing a parent <Pictode /> component.`);
  }
  return pictode;
};
