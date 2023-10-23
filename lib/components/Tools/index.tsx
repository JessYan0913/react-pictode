import { Fragment, useContext, useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Tool, util } from '@pictode/core';
import { EllipseTool, EraserTool, ImageTool, LineTool, RectTool, SelectTool, TextTool } from '@pictode/tools';

import { PictodeContext } from '../Pictode/index';

import { ToolInfo, ToolsProps, ToolType } from './types';

const tools: {
  [key in ToolType]: ToolInfo;
} = {
  selectTool: {
    title: 'selectTool',
    tool: () =>
      new SelectTool({
        hooks: {
          onActive(app) {
            app.getPlugin('selectorPlugin')?.enable?.();
          },
          onInactive(app) {
            app.getPlugin('selectorPlugin')?.disable?.();
          },
        },
      }),
  },
  rectTool: {
    title: 'rectTool',
    tool: () =>
      new RectTool({
        config: {
          stroke: '#ff00ff',
          strokeWidth: 2,
        },
        hooks: {
          onActive(app) {
            app.containerElement.style.cursor = 'crosshair';
            app.cancelSelect();
          },
          onInactive(app) {
            app.containerElement.style.cursor = `default`;
          },
        },
      }),
  },
  ellipseTool: {
    title: 'ellipseTool',
    tool: () =>
      new EllipseTool({
        config: {
          stroke: '#ff00ff',
          strokeWidth: 2,
        },
        hooks: {
          onActive(app) {
            app.containerElement.style.cursor = 'crosshair';
            app.cancelSelect();
          },
          onInactive(app) {
            app.containerElement.style.cursor = `default`;
          },
        },
      }),
  },
  lineTool: {
    title: 'lineTool',
    tool: () =>
      new LineTool({
        config: {
          stroke: '#ff00ff',
          strokeWidth: 2,
        },
        hooks: {
          onActive(app) {
            app.containerElement.style.cursor = 'crosshair';
            app.cancelSelect();
          },
          onInactive(app) {
            app.containerElement.style.cursor = `default`;
          },
        },
      }),
  },
  eraserTool: {
    title: 'eraserTool',
    tool: () =>
      new EraserTool({
        hooks: {
          onActive(app) {
            app.containerElement.style.cursor = `pointer`;
          },
          onInactive(app) {
            app.containerElement.style.cursor = `default`;
          },
        },
      }),
  },
  textTool: {
    title: 'textTool',
    tool: () =>
      new TextTool({
        config: {
          stroke: '#ff00ff',
          strokeWidth: 2,
        },
        hooks: {
          onActive(app) {
            app.containerElement.style.cursor = 'crosshair';
          },
          onInactive(app) {
            app.containerElement.style.cursor = `default`;
          },
        },
      }),
  },
  imageTool: {
    title: 'imageTool',
    tool: () =>
      new ImageTool({
        hooks: {
          async onActive(app, tool) {
            app.cancelSelect();
            const files = await util.selectFile(['.jpg', '.png', '.jpge', '.PNG', '.JPG', '.JPGE', '.svg'], false);
            const imgSrc = await util.readeFile<string>((reader: FileReader) => reader.readAsDataURL(files[0]));
            (tool as ImageTool).imageElement.src = imgSrc;
          },
          onInactive(app) {
            app.containerElement.style.cursor = `default`;
          },
        },
      }),
  },
};

const getTool = (tool: ToolType): Tool => tools[tool].tool();

export function Tools(props: ToolsProps) {
  const pictode = useContext(PictodeContext);
  if (!pictode) {
    throw new Error(`<Tools /> is missing a parent <Pictode /> component.`);
  }
  const { tools = ['selectTool', 'rectTool', 'ellipseTool', 'lineTool', 'textTool', 'imageTool'], itemRender } = props;
  const [tool, setTool] = useState<ToolType>('selectTool');

  useEffect(() => {
    pictode.app.setTool(getTool(tool));
  }, [tool, pictode.app]);

  return (
    <RadioGroup value={tool} onChange={setTool}>
      {tools.map((tool) => (
        <RadioGroup.Option key={tool} value={tool} as={Fragment}>
          {({ checked, active }) => (itemRender ? itemRender({ active, checked, tool }) : <></>)}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
