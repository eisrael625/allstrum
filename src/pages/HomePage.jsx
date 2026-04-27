import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import VideoCanvas from '../VideoCanvas'
import videoA from '../assets/project-ac913ca8-4fa9-4430-b019-523f60e61988.webm'

export default function HomePage() {
  const videoRef   = useRef(null)
  const sectionRef = useRef(null)
  const navigate   = useNavigate()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      const v = videoRef.current
      if (!v) return
      if (entry.isIntersecting) {
        const play = () => v.play()?.catch(() => {})
        if (v.readyState >= 3) play()
        else v.addEventListener('canplay', play, { once: true })
      } else {
        v.pause()
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="phone-section" style={{ height: '100vh' }} ref={sectionRef}>
      <div className="layout layout-reversed">
        <div className="features">
          <div>
            <h1 className="headline">
              <span className="line line-1">A Smarter</span>
              <span className="line line-2">Way to Play</span>
            </h1>
            <button className="see-more-btn" onClick={() => navigate('/features')}>
              See Full App Features →
            </button>
          </div>
        </div>

        <div className="video-wrap">
          <div className="video-slot" style={{ opacity: 1 }}>
            <VideoCanvas ref={videoRef} src={videoA} preload="auto" loop={false} style={{}} />
          </div>
        </div>
      </div>
    </section>
  )
}
