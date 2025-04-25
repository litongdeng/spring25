// import { useState, useRef } from 'react'
// import Draggable from 'react-draggable';
import './App.css'
import Tile from './Tile.jsx';
import { events } from './events.js';

function App() {
  // const [count, setCount] = useState(0)
  // const nodeRef = useRef(null);
  // return (
  //   <>
  //      <Draggable nodeRef={nodeRef}>
  //     <div ref={nodeRef} className="card">
  //       <div className="header">hi</div>
  //       <div className="content">Content</div>
  //     </div>
  //   </Draggable>
  //   </>
  // )

  return (
    <>
      {
        events().map(e => {
          return <Tile date={e.date} content={e.event} key={e.event} />
        })
      }
    </>
  )

}

export default App
