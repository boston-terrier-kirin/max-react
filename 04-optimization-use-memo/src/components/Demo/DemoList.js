import React, { useMemo } from 'react';

/**
 * ここでやろうとしていること。
 * props.titleが変わったら当然、DemoListをrenderし直する必要があるけど、
 * そうすると、sortもやり直さないとダメになってしまう。
 *
 * useMemoでソートが行われないようにしたい。
 */
const DemoList = (props) => {
  console.log('DemoList');

  const { items } = props;

  const sortedList = useMemo(() => {
    console.log('DemoList.sort');

    return items.sort((a, b) => a - b);
  }, [items]);

  return (
    <div>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);
