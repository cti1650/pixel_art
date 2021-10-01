import { useCallback, useEffect, useState } from "react";
import cc from 'classcat'

export const useCharHandler = (char, option = {}) => {
  const [h, setH] = useState(0);
  const [x, setX] = useState(0);
  const [defaultOption, setDefaultOption] = useState({
    enableJamp: false,
    v0: 40,
  });
  useEffect(() => {
    setDefaultOption(prev => {
      return { ...prev, ...option };
    })
  }, [])
  const jamp = useCallback(() => {
    if (defaultOption['enableJamp']) {
      let v0 = defaultOption['v0'] && 40
      let time = 0
      let gravity = 9.8
      let interval = setInterval(() => {
        setH(prev => {
          if (v0 * time - 0.5 * gravity * time * time >= 0) {
            return v0 * time - 0.5 * gravity * time * time;
          } else {
            clearInterval(interval)
            return 0;
          }
        })
        time++;
      }, 50);
    }
  }, [])
  const moveRight = useCallback(() => {
    setX(prev => {
      return prev + 10;
    })
  }, []);
  const moveLeft = useCallback(() => {
    setX(prev => {
      return prev - 10;
    })
  }, []);
  const charElement = useCallback(() => {
    return char ? (<div style={{
      bottom: h, left: x,
    }
    } className="absolute flex flex-row" >
      <div className="w-20" onMouseDown={moveLeft}></div>
      <div onClick={jamp}>{char}</div>
      <div className="w-20" onMouseDown={moveRight}></div>
    </div >) : (<div></div>);
  }, [char]);
  const controller = useCallback(() => {
    const baseClass = "py-2 px-4 select-none border border-gray-700 bg-gray-300 focus:outline-none";
    return (<div className="flex flex-row font-extrabold text-xl" >
      <div className={cc([baseClass, "rounded-l-lg"])} onMouseDown={moveLeft}>←</div>
      <div className={cc([baseClass, "px-4"])} onClick={jamp}>↑</div>
      <div className={cc([baseClass, "rounded-r-lg"])} onMouseDown={moveRight}>→</div>
    </div >);
  }, []);
  return { h, x, jamp, moveLeft, moveRight, charElement, controller }
}