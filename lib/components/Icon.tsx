import IconPark, { ALL_ICON_KEYS, IconType, Theme } from '@icon-park/react/es/all';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: IconType;
  size?: number | string;
  theme?: Theme;
}

export const Icon = (props: IconProps) => {
  const { type, size, theme, className, ...restProps } = props;
  if (ALL_ICON_KEYS.indexOf(type) < 0) {
    return <span>Not Exists</span>;
  }

  return (
    <IconPark
      className={`${className} pe-p-2 pe-cursor-pointer pe-flex pe-items-center pe-justify-center`}
      type={type}
      size={size}
      theme={theme}
      {...restProps}
    />
  );
};
