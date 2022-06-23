import { useState, useRef, useEffect } from 'react';
import uuid from 'react-uuid';
import { gsap } from 'gsap';

import bg_m from '../img/bg-pattern-mobile.svg';
import bg_d from '../img/bg-pattern-desktop.svg';
import img_m from '../img/illustration-woman-online-mobile.svg';
import img_d from '../img/illustration-woman-online-desktop.svg';
import box from '../img/illustration-box-desktop.svg';

import Arrow from './comps/arrow';

import { useScreen } from './hooks/use-screen.js';
import { data } from '../data/data';
import { css } from './utils/css';

// ==============================================

export default function App() {
  // --------------------------------------------

  const { mobile } = useScreen();

  const [open, setOpen] = useState({ prev: null, curr: null });

  const arrows = useRef([]);
  const answers = useRef([]);

  // --------------------------------------------

  const clickHandler = (idx) => () => {
    if (open.curr !== idx) {
      setOpen((p) => ({ prev: p.curr, curr: idx }));
    }
  };

  // --------------------------------------------

  useEffect(() => {
    if (open.curr !== null) {
      const duration = 0.2;
      const height = mobile ? '90px' : '75px';
      const orange = css.get('orange');
      const primary = css.get('text-primary');

      const curr_arrow = arrows.current[open.curr];
      gsap.to(curr_arrow, {
        rotate: '180',
        fill: orange,
      });

      const prev_arrow = arrows.current[open.prev];
      gsap.to(prev_arrow, {
        rotate: '-180',
        fill: primary,
      });

      const tl = gsap.timeline();

      if (open.prev !== null) {
        const prev_answer = answers.current[open.prev];

        tl.fromTo(
          prev_answer,
          { color: orange },
          { color: 'rgba(0, 0, 0, 0)', duration }
        );
        tl.fromTo(prev_answer, { height }, { height: '0px', duration });
      }

      const curr_answer = answers.current[open.curr];
      tl.to(curr_answer, { height, duration });
      tl.to(curr_answer, { color: orange, duration });
    }
  }, [open]);

  // --------------------------------------------

  return (
    <>
      <div className='app'>
        <div className='img-container'>
          <img className='bg' src={mobile ? bg_m : bg_d} alt='' />
          <img className='img' src={mobile ? img_m : img_d} alt='' />
          <img className='box' src={box} alt='' />
        </div>
        <div className='faq-container'>
          <h1>FAQ</h1>
          <div className='accordian'>
            {data.map(({ q, a }, i) => (
              <div className='item' key={uuid()}>
                <div className='question' onClick={clickHandler(i)}>
                  <p>{q}</p>
                  <Arrow ref={(el) => (arrows.current[i] = el)} />
                </div>
                <div className='answer' ref={(el) => (answers.current[i] = el)}>
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ==============================================
