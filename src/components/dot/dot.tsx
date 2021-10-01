import React, { useCallback, useEffect, useState } from 'react';
import cc from 'classcat';
export const Dot = (props) => {
  const { dotHex, onChange } = props;
  const [dot, setDot] = useState([]);
  const dotToBin = useCallback((dotData) => {
    if (dotData) {
      return dotData.map(item => { if (item) { return '1' } else { return '0' } }).reverse().join('');
    } else {
      return '';
    }
  }, [])
  const binToDot = useCallback((dotStr) => {
    if (dotStr) {
      return dotStr.split('').map(item => { if (item) { return '1' } else { return '0' } }).reverse();
    } else {
      return '';
    }
  }, [])
  const dotToHex = useCallback((dotData) => {
    if (dotData) {
      return parseInt(dotToBin(dotData), 2);
    } else {
      return '';
    }
  }, [])
  useEffect(() => {
    if (dotHex) {
      const parsed = parseInt(dotHex, 16);
      if (!isNaN(parsed)) {
        const dotArr = parsed.toString(2).split('').reverse().map(item => { return item === '1' });
        console.log([...new Array(17 * 17)].map((item, index) => { return dotArr[index] !== undefined && dotArr[index] !== false }));
        setDot([...new Array(17 * 17)].map((item, index) => { return dotArr[index] !== undefined && dotArr[index] !== false }))
      } else {
        setDot([...new Array(17 * 17)].map((item, index) => { return false }))
      }
    } else {
      setDot([...new Array(17 * 17)].map((item, index) => { return false }))
    }
  }, []);

  const handleClick = useCallback((index) => {
    setDot(prev => {
      const arr = [...prev];
      arr[index] = !prev[index];
      return arr;
    })
  }, []);
  useEffect(() => {
    if (dot) {
      if (typeof (onChange) === 'function') {
        // console.log(dotToHex(dot));
        console.log(dotToBin(dot));
        onChange(parseInt(dot.map(item => { if (item) { return '1' } else { return '0' } }).reverse().join(''), 2).toString(16))
      }
    }
  }, [dot])
  return (
    <>
      <div>
        <div
          className='grid grid-flow-row grid-cols-17 grid-rows-17'
          style={{
            width: '340px',
            height: '340px',
            gridTemplateColumns: 'repeat(17, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(17, minmax(0, 1fr))',
          }}
        >
          {dot && [...new Array(17 * 17)].map((item, index) => {
            return <button className={cc([' border border-gray-700', {
              "bg-black": dot[index] !== false
            }])} onClick={() => { handleClick(index) }}></button>;
          })}
        </div>
        <div>
          {dot && dotToBin(dot)}
        </div>
      </div>
    </>
  );
};
