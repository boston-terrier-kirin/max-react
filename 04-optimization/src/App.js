import React, { useState, useCallback } from 'react';

import './App.css';
import DemoOutput from './components/Demo/DemoOutput';
import Button from './components/UI/Button/Button';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  // ■useCallback
  // dependencyにallowToggleが入っていないので、allowToggleがtrueに変わっても、古い値を参照し続けてしまう。
  // const toggleHandler = useCallback(() => {
  //   cconsole.log('allowToggle', allowToggle);
  //   if (allowToggle) {
  //     setShowParagraph((prev) => !prev);
  //   }
  // }, []);
  const toggleHandler = useCallback(
    () => {
      console.log('allowToggle', allowToggle);
      if (allowToggle) {
        setShowParagraph((prev) => !prev);
      }
    },
    // allowToggleをdependencyに入れているので、allowToggleが変わったらfunctionを作り直す。
    [allowToggle]
  );

  const allowToggleHandler = () => {
    setAllowToggle(true);

    // このタイミングでは allowToggle はfalseのまま。
    // Reactはステートをまとめて変更しているからか、ステートが変わって、re-render される時点で true になる。
    console.log(allowToggle);
  };

  // ■React.memp
  // ・DemoOutputはプリミティブのbooleanなので、memoが効く。
  // ・ButtonはtoggleHandlerのfunctionなので、memoが効かない。⇒useCallbackを使えばmemoが効くようになる。
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow Toggle</Button>
      <Button onClick={toggleHandler}>Show</Button>
    </div>
  );
}

export default App;
