import { useRef, useState, useEffect } from 'react'
import "./../../App.css"
export default function Bookmark ({
  bookmark,
  updateBookmark,
  deleteBookmark
}) {
  const [showInput, setShowInput] = useState(false)
  const inputRef = useRef(null)
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')
  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [bookmark.title, bookmark.url])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    <>
     <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
      <img style={{ "borderRadius": "5%", "objectFit": "contain", "width": "100%", "height": "15vw" }} src={bookmark.url} alt={bookmark.title} />
    
        {/* <div className="bookmark-options">
          {bookmark.options.map(option => {
            return <div className="bookmark-option" key={option}>{option}</div>
          })}
        </div> */}
      </div>
      <div className="back" ref={backEl}>{bookmark.title}</div>
    </div>
      {/* <li>
        <h4 onClick={() => setShowInput(!showInput)}>{bookmark.title}</h4>
        <input
          ref={inputRef}
          style={{ display: showInput ? 'block' : 'none' }}
          type='text'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const title = inputRef.current.value
              updateBookmark(bookmark._id, { title })
              setShowInput(false)
            }
          }}
          defaultValue={bookmark.title}
        />
        <img src={bookmark.url} alt=''HI/>
        <button
          onClick={() => deleteBookmark(bookmark._id)}
        >
          X
        </button>
      </li> */}
    </>
  )
}