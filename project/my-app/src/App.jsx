import { useState, useRef } from 'react'
import Draggable from 'react-draggable';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null);
  return (
    <>
       <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} className="card">
        <div className="header">hi</div>
        <div className="content">Content</div>
      </div>
    </Draggable>
    </>
  )
}

export default App
