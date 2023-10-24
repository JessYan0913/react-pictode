import { util } from '@pictode/core';

export interface LineToolProps extends React.HTMLAttributes<HTMLDivElement> {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  cornerRadius?: number | number[];
  opacity?: number;
  lineJoin?: 'round' | 'bevel' | 'miter';
  lineCap?: 'butt' | 'round' | 'square';
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffset?: util.Point;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowOpacity?: number;
  shadowEnabled?: boolean;
}
