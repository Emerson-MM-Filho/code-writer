import { useState, useEffect } from 'react'
import BaseModal from '../BaseModal'
import CodeInput from '../CodeInput'
import { getCodeBlocksOnStorage } from '../../utils/localstorage'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export default function SettingsModal({stateController}) {
    const [codeInputs, setCodeInputs] = useState([])

    useEffect(() => {
        const savedBlocks = getCodeBlocksOnStorage(localStorage)
        setCodeInputs(savedBlocks)
      }, [])

    const getCodeInputById = codeInputId => {
        const filteredCodeInputs = codeInputs.filter(({id, _}) => id == codeInputId)
        return filteredCodeInputs ? filteredCodeInputs[0] : null
    }

    const updateCodeInputValue = (id, value) => {
        const codeInput = getCodeInputById(id)
        if (codeInput == null) return

        codeInput['value'] = value
        localStorage.setItem('codeInputs', JSON.stringify(codeInputs))
    }

    const addNewCodeInput = () => {
        let lastCodeInput = null
        if (codeInputs != []) {
            lastCodeInput = codeInputs[codeInputs.length - 1]
        }

        let newCodeInputId = 0
        if (lastCodeInput) {
            newCodeInputId = lastCodeInput['id'] + 1
        }

        let index = 0
        if (lastCodeInput) {
            index = lastCodeInput['index'] + 1
        }

        setCodeInputs([...codeInputs, {"id": newCodeInputId, "value": "", "value": index}])
    }

    const deleteCodeInput = codeId => {
        const copy = [...codeInputs]
        const clearedCopy = copy.filter(({id, _}) => id !== codeId)
        setCodeInputs(clearedCopy)
        localStorage.setItem('codeInputs', JSON.stringify(clearedCopy))
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
      
        const codeInputsCopy = [...codeInputs];
        const [selected] = codeInputsCopy.splice(source.index, 1);
        console.log(selected)
        // copiedItems.splice(destination.index, 0, removed);
        // setColumns({
        //     ...columns,
        //     [source.droppableId]: {
        //         ...column,
        //         items: copiedItems
        //     }
        // });
      };

    return (
        <BaseModal
            stateController={stateController}
        >
            <div>
                <h1>Settings</h1>
                <button onClick={addNewCodeInput}>Add Code Input</button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='codeInputs'>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    background: snapshot.isDraggingOver
                                    ? "lightblue"
                                    : "lightgrey",
                                    padding: 4,
                                    width: 250,
                                    minHeight: 500
                                }}
                            >
                            {codeInputs.map(({id, index, value}) => (
                                <CodeInput
                                    key={id}
                                    codeId={id}
                                    index={index}
                                    value={value}
                                    updateValueFunction={updateCodeInputValue}
                                    deleteCodeInput={deleteCodeInput}
                                />
                            ))}
                            {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable> 
            </DragDropContext>
        </BaseModal>
    )
}
