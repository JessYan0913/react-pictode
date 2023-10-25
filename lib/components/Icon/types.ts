import { IconType, Theme } from '@icon-park/react/es/all';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: IconType;
  size?: number | string;
  theme?: Theme;
}
