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
                    className={`${styles.codeBlock} ${snapshot.isDraggingOver ? styles.isdragging : styles.notdragging}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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