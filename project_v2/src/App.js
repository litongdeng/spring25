//App.js

//make it look nice
//remove items from event bank

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
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
    const correctNames = ["1", "2", "3", "4", "5"];
    for (let i = 0; i < correctNames.length; i++) {
        correct[i] = <DragItem name={correctNames[i]} />
    }

    function checkTimeline() {
        const droppedNames = [];
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
    // shuffle(items);

    const handleDrop = (item, pos) => {
        // setDroppedItems((prevItems) => [...prevItems, item]); OG CODE
        console.log("Dropped")
        console.log(item)
        console.log(pos)
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
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div style={{
                    border: '1px solid #ccc',
                    padding: '20px',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    <h1>Flashback :D</h1>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>
                        <div style={{
                            border: '1px solid #ccc',
                            padding: '10px', borderRadius: '5px'
                        }}>
                            <h2>Event Bank</h2>
                            {items.map((item, index) => (
                                item
                            ))}
                        </div>
                        <div style={{
                            border: '1px solid #ccc',
                            padding: '10px', borderRadius: '5px'
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
                                                alignItems: 'center',
                                            }}>
                                            <p>{item.name}</p>
                                            <button onClick={
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