import React, {
  Children, cloneElement, forwardRef, isValidElement,
  useEffect, useImperativeHandle, useMemo, useRef
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = forwardRef(({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}, ref) => {
  const config =
    easing === 'elastic'
      ? { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
      : { ease: 'power1.inOut',          durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs    = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]); // eslint-disable-line

  const order       = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef       = useRef(null);
  const intervalRef = useRef();
  const container   = useRef(null);
  const swapFnRef   = useRef(null); // stored so imperative handle can call it

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    /* ── forward swap ── */
    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, { y: '+=500', duration: config.durDrop, ease: config.ease });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el   = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${i * 0.15}`);
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return');
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease }, 'return');
      tl.call(() => { order.current = [...rest, front]; });
    };

    /* ── backward swap ── */
    const swapPrev = () => {
      if (order.current.length < 2) return;
      const lastIdx = order.current[order.current.length - 1];
      const rest    = order.current.slice(0, -1);
      const elBack  = refs[lastIdx].current;
      const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);
      const tl = gsap.timeline();
      tlRef.current = tl;

      // Snap the incoming card below viewport, then fly it up
      tl.set(elBack, { y: frontSlot.y + 600, zIndex: refs.length });
      tl.to(elBack, { x: frontSlot.x, y: frontSlot.y, z: frontSlot.z, duration: config.durReturn, ease: config.ease });

      // Push current cards back one slot
      rest.forEach((idx, i) => {
        const el   = refs[idx].current;
        const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, '<');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, '<');
      });

      tl.call(() => { order.current = [lastIdx, ...rest]; });
    };

    swapFnRef.current = { swap, swapPrev };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause  = () => { tlRef.current?.pause(); clearInterval(intervalRef.current); };
      const resume = () => { tlRef.current?.play();  intervalRef.current = window.setInterval(swap, delay); };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]); // eslint-disable-line

  /* ── Imperative API ── */
  useImperativeHandle(ref, () => ({
    next: () => {
      const fns = swapFnRef.current;
      if (!fns) return;
      clearInterval(intervalRef.current);
      fns.swap();
      intervalRef.current = window.setInterval(fns.swap, delay);
    },
    prev: () => {
      const fns = swapFnRef.current;
      if (!fns) return;
      clearInterval(intervalRef.current);
      fns.swapPrev();
      intervalRef.current = window.setInterval(fns.swap, delay);
    },
  }));

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => { child.props.onClick?.(e); onCardClick?.(i); }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
});

CardSwap.displayName = 'CardSwap';
export default CardSwap;
