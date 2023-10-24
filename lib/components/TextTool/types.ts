import { util } from '@pictode/core';

export interface TextToolProps extends React.HTMLAttributes<HTMLDivElement> {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  fontSize?: number;
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
