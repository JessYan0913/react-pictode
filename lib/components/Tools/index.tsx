import { Fragment, useContext, useState } from 'react';
import { RadioGroup } from '@headlessui/react';

import { PictodeContext } from '../Pictode/index';

import { ToolsProps } from './types';

export function Tools(props: ToolsProps) {
  const pictode = useContext(PictodeContext);
  if (!pictode) {
    throw new Error(`<Tools /> is missing a parent <Pictode /> component.`);
  }
  const { tools = ['selectTool', 'rectTool', 'ellipseTool', 'lineTool', 'textTool'] } = props;
  const [tool, setTool] = useState('Startup');

  return (
    <RadioGroup value={tool} onChange={setTool}>
      {tools.map((tool) => (
        <RadioGroup.Option key={tool} value={tool} as={Fragment}>
          {({ checked }) => (
            <li className={`${checked ? 'pe-bg-blue-500 pe-text-white' : 'pe-bg-white pe-text-black'}`}>{tool}</li>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
