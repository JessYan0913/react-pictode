import { Fragment, useCallback, useEffect, useState } from 'react';
import { ColorChangeHandler, GithubPicker } from 'react-color';
import { Popover } from '@headlessui/react';

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  color?: string;
  colors?: string[];
  onChange?: (color: string) => void;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const { color, colors, onChange, className } = props;
  const [curColor, setCurColor] = useState<string>();
  const onGithubPickerChange = useCallback<ColorChangeHandler>(
    ({ hex }) => {
      setCurColor(hex);
      onChange?.(hex);
    },
    [onChange]
  );
  useEffect(() => {
    setCurColor(color);
  }, [color]);
  return (
    <Popover as={Fragment}>
      <Popover.Button
        className={`${className} pe-cursor-pointer`}
        style={{ backgroundColor: curColor }}
      ></Popover.Button>
      <Popover.Panel>
        <GithubPicker color={curColor} colors={colors} onChange={onGithubPickerChange}></GithubPicker>
      </Popover.Panel>
    </Popover>
  );
};

export default ColorPicker;
