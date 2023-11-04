import { useEffect, useRef } from 'react';

import { usePictode } from '../hooks/usePictode';

export interface StageProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Stage = (props: StageProps) => {
  const { app } = usePictode('Stage');

  const { className, ...restProps } = props;

  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (stageRef.current) {
      app.mount(stageRef.current);
    }
  }, [app]);

  return <div className={`${className ?? ''}`} ref={stageRef} {...restProps}></div>;
};
