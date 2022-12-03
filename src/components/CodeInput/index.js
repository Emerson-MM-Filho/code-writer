import { useState } from "react"
import { Draggable } from 'react-beautiful-dnd';
import styles from './styles.module.css'

export default function CodeBlockSettings({codeId, index, value, updateValueFunction, deleteCodeInput}) {
    const [inputValue, setInputValue] = useState(value)
    const handleChange = event => {
        const {value} = event.target
        setInputValue(value)
        updateValueFunction(codeId, value)
    }
    const handleDelete = _ => {
        deleteCodeInput(codeId)
    }
    return (
        <Draggable
            draggableId={codeId.toString()}
            index={index}
        >
            {(provided, snapshot) => {
            return (
                <div
                    className={styles.codeBlock}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: snapshot.isDragging
                        ? "#263B4A"
                        : "#456C86",
                        color: "white",
                        ...provided.draggableProps.style
                    }}
                >
                <textarea
                    value={inputValue}
                    onChange={handleChange}
                />
                <button onClick={handleDelete}>Delete</button>
                </div>
            );
            }}
        </Draggable>
    )
}