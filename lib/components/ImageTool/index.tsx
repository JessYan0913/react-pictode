import { util } from '@pictode/core';
import { ImageTool as Image } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';

import { ImageToolProps } from './types';

export const ImageTool = (props: ImageToolProps) => {
  const { app, selectorPlugin } = usePictode('LineTool');
  const { stroke = '#000000', strokeWidth = 2, opacity = 1, children, className } = props;

  const onClick = async () => {
    const files = await util.selectFile(['.jpg', '.png', '.jpge', '.PNG', '.JPG', '.JPGE', '.svg'], false);
    const imgSrc = await util.readeFile<string>((reader: FileReader) => reader.readAsDataURL(files[0]));
    const imageTool = new Image({
      config: {
        stroke,
        strokeWidth,
        opacity,
      },
      hooks: {
        onActive() {
          selectorPlugin.disable();
        },
      },
    });
    imageTool.imageElement.src = imgSrc;
    app.setTool(imageTool);
  };

  return (
    <>
      <div className={className} onClick={onClick}>
        {children ?? <button>Image</button>}
      </div>
    </>
  );
};
