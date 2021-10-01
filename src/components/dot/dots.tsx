import React, { useCallback, useEffect, useState } from 'react';
import cc from 'classcat';
import { useCharHandler } from '@hooks/useCharHandler';
export const Dots = (props) => {
  const { data, enableJamp, dotCount, onChange, className, size, enable } = props;
  const { h, jamp } = useCharHandler({ enableJamp: enableJamp });
  const [dot, setDot] = useState([]);
  useEffect(() => {
    if (data) {
      setDot(data);
    } else {
      setDot([...new Array(dotCount)].map(item => { return [...new Array(dotCount)].map(data => { return false }) }))
    }
  }, [data])
  const handleClick = useCallback((row, col) => {
    if (enable) {
      setDot(prev => {
        const arr = [...prev];
        arr[row][col] = !prev[row][col];
        return arr;
      })
    }
  }, []);
  useEffect(() => {
    if (typeof (onChange) === 'function') {
      onChange(dot);
    }
  }, [dot])
  return (
    <>
      <div className="p-0 flex flex-col border" style={{
        width: size,
        height: size,
        marginTop: -h,
      }} onClick={jamp}>
        {dot && dot.map((row, rIndex) => {
          return <div className="w-full h-full p-0 m-0 flex flex-row border-0">
            {row && row.map((col, cIndex) => {
              return <button className={cc(['w-full h-full p-0 m-0', className, {
                "border border-gray-300": enable,
                "border-0": !enable,
                "bg-black": col !== false
              }])} onClick={() => { handleClick(rIndex, cIndex) }}></button>;
            })}
          </div>
        })}
      </div>
    </>
  );
};

Dots.defaultProps = {
  size: '340px',
  enable: true,
  className: '',
  dotCount: 17,
  data: null,
}