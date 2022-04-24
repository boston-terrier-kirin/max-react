import React from 'react';
import MyParagraph from './MyParagraph';

const DemoOutput = (props) => {
  console.log('DemoOutput');

  return <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>;
};

/**
 * React.memoは、propsの値が同じであればレンダリングをスキップする。
 */
export default React.memo(DemoOutput);
