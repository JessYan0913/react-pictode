import type { ReactElement } from 'react';
import type { Tool } from '@pictode/core';

export interface ToolInfo {
  title: string;
  tool: () => Tool;
}

export type ToolType = 'selectTool' | 'rectTool' | 'ellipseTool' | 'eraserTool' | 'lineTool' | 'textTool' | 'imageTool';

export interface ToolsProps extends React.HTMLAttributes<HTMLDivElement> {
  tools?: ToolType[];
  itemRender?: (props: { active: boolean; checked: boolean; tool: string }) => ReactElement;
}
