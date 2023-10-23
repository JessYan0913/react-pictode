import { Pictode, Tools } from '../';

import './App.css';

function App() {
  return (
    <>
      <div className="pe-w-full pe-h-screen pe-flex pe-flex-col">
        <Pictode>
          <Tools
            itemRender={({ checked, tool }) => (
              <li className={`${checked ? 'pe-bg-blue-500 pe-text-white' : 'pe-bg-white pe-text-black'}`}>{tool}</li>
            )}
          ></Tools>
        </Pictode>
      </div>
    </>
  );
}

export default App;
