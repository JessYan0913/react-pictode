import { Fragment } from 'react';
import IconPark, { ALL_ICON_KEYS } from '@icon-park/react/es/all';

import { IconProps } from './types';

export const Icon = (props: IconProps) => {
  const { type, size, theme } = props;

  if (ALL_ICON_KEYS.indexOf(type) < 0) {
    return <span>Not Exists</span>;
  }

  return (
    <Fragment>
      <IconPark
        className={'pe-p-2 pe-cursor-pointer pe-flex pe-items-center pe-justify-center'}
        type={type}
        size={size}
        theme={theme}
      />
    </Fragment>
  );
};
