import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import videoB from '../assets/project-bdee8ffe-129d-4da5-b5f8-4d779b5c1e74.webm'
import videoC from '../assets/project-9bc73e8c-82b5-4e34-a9dc-56453af258ef (1).webm'
import videoD from '../assets/project-33842367-bc19-4967-b1f4-72be01e43a70.webm'
import videoE from '../assets/project-21de6005-d70f-44c1-9103-5bcdb4596279.webm'

const playlist = [videoD, videoC, videoE, videoB]

const slides = [
  { lines: ['Master',    'Every Chord'],   sub: 'Choose a chord from the app and AllStrum holds it for you automatically.' },
  { lines: ['Play What', 'You Love'],      sub: 'Your saved songs are always one click away.'                              },
  { lines: ['Compose',   'New Songs'],     sub: 'Build chord progressions from scratch and make your own music.'           },
  { lines: ['Play at',   'Your Own Pace'], sub: 'Adjust the tempo to fit any song and play at the right pace for you.'    },
]

const videoStyle = {
  maxHeight: '95vh',
  maxWidth: '100%',
  width: 'auto',
  height: 'auto',
  display: 'block',
}

// Survives remounts within the same browser session
const played = new Set()

export default function FeaturesPage() {
  const navigate    = useNavigate()
  const videoRefs   = useRef([])
  const sectionRefs = useRef([])
  const [active, setActive] = useState(new Set())

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    return () => { played.clear() }
  }, [])

  useEffect(() => {
    const observers = sectionRefs.current.map((section, i) => {
      if (!section) return null
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !played.has(i)) {
          played.add(i)
          setActive(prev => new Set([...prev, i]))
          const v = videoRefs.current[i]
          if (v) {
            const play = () => v.play()?.catch(() => {})
            if (v.readyState >= 3) play()
            else v.addEventListener('canplay', play, { once: true })
          }
        }
      }, { threshold: 0.4 })
      obs.observe(section)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <div className="fp-scroll">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      {slides.map((slide, i) => (
        <section
          key={i}
          className="fp-section"
          ref={el => { sectionRefs.current[i] = el }}
        >
          <div className={`fp-grid${i % 2 === 1 ? ' fp-grid--rev' : ''}`}>
            <div className="fp-text">
              <h1 className="headline">
                {slide.lines.map((line, j) => (
                  <span key={j} className={`line line-${j + 1}`}>{line}</span>
                ))}
              </h1>
              {slide.sub && <p className="subtext">{slide.sub}</p>}
            </div>

            <div className="fp-video">
              <div className={`video-reveal${active.has(i) ? ' active' : ''}`}>
                <video
                  ref={el => { videoRefs.current[i] = el }}
                  src={playlist[i]}
                  muted
                  playsInline
                  preload="auto"
                  style={videoStyle}
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
