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
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const App = () => {
    const nullArray = Array(itemCount).fill(null);
    const [droppedItems, setDroppedItems] = useState(nullArray);
    const correctNames = [
        "Cal is founded as the first UC System school",
        "the University of California moves its location to Berkeley",
        "First Big Game",
        "Free Speech Movement",
        "Jennifer Doudna wins the Nobel Prize in Chemistry"
    ];

    const initialBank = correctNames.map(name => <DragItem key={name} name={name} />);
    const [items, setItems] = useState(shuffle(initialBank));

    function checkTimeline() {
        const namesPlaced = droppedItems.map(item => item?.name || null);
        return namesPlaced.every((value, index) => value === correctNames[index]);
    }

    const handleDrop = (item, pos) => {
        // Add to timeline
        setDroppedItems(prev => [
            ...prev.slice(0, pos),
            { name: item.name },
            ...prev.slice(pos + 1)
        ]);

        // Remove from bank
        setItems(prevItems => prevItems.filter(i => i.props.name !== item.name));
    };

    const handleRemoveItem = (index) => {
        const removed = droppedItems[index];
        if (!removed) return;

        // Clear timeline slot
        const updatedDropped = [...droppedItems];
        updatedDropped[index] = null;
        setDroppedItems(updatedDropped);

        // Return to bank
        setItems(prevItems => [...prevItems, <DragItem key={removed.name} name={removed.name} />]);
    };

    const { width, height } = useWindowSize();

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', flex: 1, maxWidth: '1200px' }}>
                    <h1 style={{ textAlign: 'center', fontFamily: 'Inter' }}>Flashback :D</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <section style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', minHeight: '100px' }}>
                            <h2 style={{ margin: '0 0 10px', fontFamily: 'Inter' }}>Event Bank</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                                {items}
                            </div>
                        </section>

                        <section style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', minHeight: '200px' }}>
                            <h2 style={{ margin: '0 0 10px', fontFamily: 'Inter', textAlign: 'center' }}>Timeline</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {droppedItems.map((item, idx) => (
                                    item == null ? (
                                        <DropZone key={idx} onDrop={dragItem => handleDrop(dragItem, idx)} />
                                    ) : (
                                        <div
                                            key={idx}
                                            style={{
                                                border: '1px solid #ccc',
                                                borderRadius: '5px',
                                                padding: '10px',
                                                backgroundColor: 'lavender',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                fontFamily: 'Inter'
                                            }}
                                        >
                                            <span>{item.name}</span>
                                            <button onClick={() => handleRemoveItem(idx)}>Remove</button>
                                        </div>
                                    )
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {checkTimeline() && (
                <Confetti width={width} height={height} recycle={false} />
            )}
        </DndProvider>
    );
};

export default App;