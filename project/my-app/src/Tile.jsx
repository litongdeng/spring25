import { useState, useRef } from 'react'
import Draggable from 'react-draggable';

function Tile ({ date, content }) {
    // const [count, setCount] = useState(0)
    
      const nodeRef = useRef(null);
      return (
        <>
           <Draggable nodeRef={nodeRef}>
          <div ref={nodeRef} className="card">
            <div className="date">{date}</div>
            <div className="content">{content}</div>
          </div>
        </Draggable>
        </>
      )
}

export default Tile;