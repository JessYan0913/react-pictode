import { EllipseTool, ImageTool, LineTool, Pictode, RectTool, SelectTool, Stage, TextTool } from '../lib/main';

import './App.css';

function App() {
  const onSelectToolActive = () => {
    console.log('选择工具激活');
  };

  const onSelectToolInactive = () => {
    console.log('选择工具失活');
  };

  return (
    <>
      <div className={'pe-w-full pe-h-full'}>
        <Pictode className={'pe-w-full pe-h-full pe-flex pe-flex-col'}>
          <div className={'pe-flex pe-flex-row'}>
            <SelectTool onActive={onSelectToolActive} onInactive={onSelectToolInactive}></SelectTool>
            <RectTool></RectTool>
            <EllipseTool></EllipseTool>
            <LineTool></LineTool>
            <TextTool></TextTool>
            <ImageTool></ImageTool>
          </div>
          <Stage className={'pe-h-full'}></Stage>
        </Pictode>
      </div>
    </>
  );
}

export default App;
