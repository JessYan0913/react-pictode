import { ToolHooks, util } from '@pictode/core';

export interface ImageToolProps extends React.HTMLAttributes<HTMLDivElement>, ToolHooks {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
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
