import React, { useState, useCallback, useMemo } from 'react';

import './App.css';
import DemoList from './components/Demo/DemoList';
import Button from './components/UI/Button/Button';

/**
 * ここでやろうとしていること。
 * props.titleが変わったら当然、DemoListをrenderし直する必要があるけど、
 * そうすると、sortもやり直さないとダメになってしまう。
 *
 * useMemoでソートが行われないようにしたい。
 */
function App() {
  const [listTitle, setListTitle] = useState('Mey List');

  const chageTitleHandler = useCallback(() => {
    setListTitle('New Title');
  }, []);

  // listItemsが配列なので、ぱっとみ値が変わっていないけど、毎回レンダリングが走ってしまう。
  // 配列の場合はmemo化が必要になる。
  const listItems = useMemo(() => {
    return [5, 3, 1, 10, 9];
  }, []);

  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={chageTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;
