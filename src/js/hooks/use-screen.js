import { useState, useEffect } from 'react';

import { css } from '../utils/css';

// ==============================================

const useScreen = () => {
  // --------------------------------------------

  const isMobile = () => {
    const reg = /(\d+)/;

    const _break = Number(css.get('break').match(reg)[0]);

    console.log('w: ', w, '\n_break: ', _break, '\nw > _break: ', w > _break);

    return w < _break;
  };

  // --------------------------------------------

  const [w, setW] = useState(window.innerWidth);
  const [h, setH] = useState(window.innerHeight);
  const [mobile, setMobile] = useState(isMobile());

  // --------------------------------------------

  useEffect(() => {
    function reportWindowSize() {
      setH(window.innerHeight);
      setW(window.innerWidth);
    }

    window.onresize = reportWindowSize;
  }, []);

  // --------------------------------------------

  useEffect(() => {
    setMobile(isMobile());
  }, [w]);

  // --------------------------------------------

  return { w, h, mobile };

  // --------------------------------------------
};

// ==============================================

export { useScreen };
