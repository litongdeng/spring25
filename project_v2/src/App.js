//make it look nice
//remove items from event bank
//fix box sizes

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
import './index.css';
import DropZone from './DropZone';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
const itemCount = 5;

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}



const App = () => {
    const nullArray = Array(itemCount).fill(null);
    const [droppedItems, setDroppedItems] = useState(nullArray);
    const correct = useState(nullArray);
    // const correctNames = ["1", "2", "3", "4", "5"];
    const correctNames = ["Cal is founded as the first UC System school",
        "the University of California moves its location to Berkeley",
        "First Big Game",
        "Free Speech Movement",
        "Jennifer Doudna wins the Nobel Prize in Chemistry"];
    const droppedNames = [];

    /* 
1868 - Cal is founded as first UC
1873 - move to Berkeley
1892 - first big game
1964 - FSM
2020 - doudna
*/
    for (let i = 0; i < correctNames.length; i++) {
        correct[i] = <DragItem name={correctNames[i]} />
    }

    function checkTimeline() {
        
        for (let i = 0; i < droppedItems.length; i++) {
            if (droppedItems[i] != null) {
                droppedNames[i] = droppedItems[i].name;
            } else {
                droppedNames[i] = null;
            }
        }

        if (droppedItems.length != correct.length) {
            return false;
        } else if (droppedNames.every((value, index) => value == correctNames[index])) {
            return true;
        }
    }

    const [items, setItems] = useState(shuffle([...correct]));

    const handleDrop = (item, pos) => {
        // setDroppedItems((prevItems) => [...prevItems, item]); OG CODE
        setDroppedItems((prevItems) => [...prevItems.slice(0, pos), item, ...prevItems.slice(pos + 1, prevItems.length)]);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...droppedItems];
        updatedItems[index] = null;
        setDroppedItems(updatedItems);
    };

    const { width, height } = useWindowSize();
    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{
                display: 'flex',
                // flexDirection: "column",
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div style={{
                    border: '1px solid #ccc',
                    padding: '20px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    flex: 1
                }}>
                    <h1>Flashback :D</h1>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexDirection: "column",
                        gap: "10px",
                        fontFamily: "Inter"
                    }}>
                        <div style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            borderRadius: '5px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',        // space between items
                            alignItems: 'center', // vertical centering
                            flexWrap: 'wrap',
                            fontFamily: "Inter",
                            flex: 1,
                            width: '100%',
                            maxWidth: '1200px',
                            justifyContent: 'center',
                            margin: '0 auto'
                            // alignItems: 'center'
                        }}>
                            <h2>Event Bank</h2>
                            {items.map((item, index) => (
                                item
                            ))}
                        </div>
                        <div style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            borderRadius: '5px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',        // space between items
                            alignItems: 'center', // vertical centering
                            flexWrap: 'wrap',
                            fontFamily: "Inter",
                            flex: 1,
                            width: '100%',
                            maxWidth: '1200px',
                            justifyContent: 'center',
                            margin: '0 auto'
                        }}>
                            <h2>Timeline</h2>


                            {droppedItems.map((item, index) => (
                                item == null ?
                                    <DropZone onDrop={(i) => handleDrop(i, index)} />
                                    : (
                                        <div
                                            key={index}
                                            style={{
                                                border: '1px solid #ccc',
                                                padding: '10px',
                                                borderRadius: '5px',
                                                marginTop: '10px',
                                                backgroundColor: 'lavender',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontFamily: "Inter"
                                            }}>
                                            <p>{item.name}</p>
                                            <button style={{ fontFamily: "Inter" }} onClick={
                                                () => handleRemoveItem(index)}>
                                                Remove
                                            </button>
                                        </div>
                                    )))}
                        </div>
                    </div>
                </div>
            </div>

            {checkTimeline() && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                />
            )}

        </DndProvider>
    );
};

export default App;