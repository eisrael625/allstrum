import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total, skew) => ({
  transform: `translate(-50%, -50%) translate3d(${i * distX}px, ${-i * distY}px, 0) skewY(${skew}deg)`,
  zIndex: total - i,
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
  children
}, ref) => {
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const [order, setOrder] = useState(() => childArr.map((_, i) => i));
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setOrder(childArr.map((_, i) => i));
  }, [childArr]);

  const next = () => {
    setOrder((current) => {
      if (current.length < 2) return current;
      const [front, ...rest] = current;
      return [...rest, front];
    });
  };

  const prev = () => {
    setOrder((current) => {
      if (current.length < 2) return current;
      const rest = current.slice(0, -1);
      return [current[current.length - 1], ...rest];
    });
  };

  useEffect(() => {
    if (paused || delay <= 0) return undefined;

    const interval = window.setInterval(next, delay);
    return () => window.clearInterval(interval);
  }, [paused, delay]);

  useImperativeHandle(ref, () => ({
    next,
    prev,
  }));

  return (
    <div
      className="card-swap-container"
      style={{ width, height }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {childArr.map((child, originalIndex) => {
        if (!isValidElement(child)) return child;

        const slotIndex = order.indexOf(originalIndex);
        const slot = makeSlot(
          Math.max(slotIndex, 0),
          cardDistance,
          verticalDistance,
          childArr.length,
          skewAmount
        );

        return cloneElement(child, {
          key: originalIndex,
          style: {
            width,
            height,
            ...slot,
            ...(child.props.style ?? {}),
          },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(originalIndex);
          },
        });
      })}
    </div>
  );
});

CardSwap.displayName = 'CardSwap';
export default CardSwap;
