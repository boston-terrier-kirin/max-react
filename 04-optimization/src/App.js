import React, { useState } from 'react';

import './App.css';
import DemoOutput from './components/Demo/DemoOutput';
import Button from './components/UI/Button/Button';

function App() {
  const [showParagraph, setShowParagraph] = useState();

  const toggleHandler = () => {
    setShowParagraph((prev) => !prev);
  };

  // React.memp
  // ・DemoOutputはプリミティブのbooleanなので、memoが効く。
  // ・ButtonはtoggleHandlerのfunctionなので、memoが効かない。
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={true} />
      <Button onClick={toggleHandler}>Show</Button>
    </div>
  );
}

export default App;
