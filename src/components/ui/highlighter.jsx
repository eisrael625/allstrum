import { useLayoutEffect, useRef } from "react"
import { useInView } from "framer-motion"
import { annotate } from "rough-notation"

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  hideAfterMs = null,
  delayMs = 0,
  style = {},
}) {
  const elementRef = useRef(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  const shouldShow = !isView || isInView

  useLayoutEffect(() => {
    const element = elementRef.current
    let annotation = null
    let resizeObserver = null
    let startTimer = null
    let fadeTimer = null
    let removeTimer = null

    if (shouldShow && element) {
      const currentAnnotation = annotate(element, {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      })

      annotation = currentAnnotation

      // Delay before starting the annotation
      startTimer = setTimeout(() => {
        currentAnnotation.show()

        // Fade out after drawing completes + pause
        if (hideAfterMs !== null) {
          const drawTime = animationDuration * iterations
          fadeTimer = setTimeout(() => {
            const prev = element.previousElementSibling
            const next = element.nextElementSibling
            const svgEl =
              prev?.tagName?.toLowerCase() === 'svg' ? prev :
              next?.tagName?.toLowerCase() === 'svg' ? next : null

            if (svgEl) {
              svgEl.style.transition = 'opacity 0.7s ease'
              svgEl.style.opacity = '0'
              removeTimer = setTimeout(() => currentAnnotation.remove(), 720)
            } else {
              currentAnnotation.remove()
            }
          }, drawTime + hideAfterMs)
        }

        resizeObserver = new ResizeObserver(() => {
          currentAnnotation.hide()
          currentAnnotation.show()
        })
        resizeObserver.observe(element)
        resizeObserver.observe(document.body)
      }, delayMs)
    }

    return () => {
      annotation?.remove()
      if (resizeObserver) resizeObserver.disconnect()
      if (startTimer)  clearTimeout(startTimer)
      if (fadeTimer)   clearTimeout(fadeTimer)
      if (removeTimer) clearTimeout(removeTimer)
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    hideAfterMs,
    delayMs,
  ])

  return (
    <span
      ref={elementRef}
      style={{ display: 'inline-block', ...style }}
    >
      {children}
    </span>
  )
}
