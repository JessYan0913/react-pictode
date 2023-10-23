import { useContext, useEffect, useRef } from 'react';

import { PictodeContext } from '../Pictode';

import { StageProps } from './types';

export const Stage = (props: StageProps) => {
  const pictode = useContext(PictodeContext);

  if (!pictode) {
    throw new Error(`<Stage /> is missing a parent <Pictode /> component.`);
  }

  const { className } = props;

  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (stageRef.current) {
      pictode.app.mount(stageRef.current);
    }
  }, [pictode.app]);

  return (
    <>
      <div className={`${className} pe-w-full pe-h-full`} ref={stageRef}></div>
    </>
  );
};
