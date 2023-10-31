import { useCallback, useMemo, useState } from 'react';
import { util } from '@pictode/core';
import { ImageTool as PictodeImageTool } from '@pictode/tools';

import { useActive } from '../hooks/useActive';
import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { ImageToolProps } from './types';

export const ImageTool = (props: ImageToolProps) => {
  const {
    config = {
      strokeWidth: 2,
      opacity: 1,
    },
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
    className,
    ...restProps
  } = props;
  const { app } = usePictode('LineTool');
  const { active } = useActive(PictodeImageTool.name);
  const [imageSrc, setImageSrc] = useState('');

  const image = useMemo(() => {
    const image = new Image();
    image.src = imageSrc;
    return image;
  }, [imageSrc]);

  const tool = useMemo(
    () =>
      new PictodeImageTool({
        config: {
          ...config,
          image,
        },
        hooks: {
          onActive,
          onInactive,
          onStartDrawing,
          onCompleteDrawing,
        },
      }),
    [config, onActive, onInactive, onStartDrawing, onCompleteDrawing, image]
  );

  const onClick = useCallback(async () => {
    const files = await util.selectFile(['.jpg', '.png', '.jpge', '.PNG', '.JPG', '.JPGE', '.svg'], false);
    setImageSrc(await util.readeFile<string>((reader: FileReader) => reader.readAsDataURL(files[0])));
    app.setTool(tool);
  }, [tool, app]);

  return (
    <>
      <div className={className} onClick={onClick} {...restProps}>
        {typeof children === 'function' ? children({ active, tool }) : children ?? <Icon type="ImageFiles"></Icon>}
      </div>
    </>
  );
};
