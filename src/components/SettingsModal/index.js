import { useState, useEffect } from 'react'
import BaseModal from '../BaseModal'
import CodeInput from '../CodeInput'
import { getCodeBlocksOnStorage } from '../../utils/localstorage'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styles from './styles.module.css'


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

        const codeInputsCopy = [...getOrderedCodeBlocks()];
        console.log(codeInputsCopy)
        const [selected] = codeInputsCopy.splice(source.index, 1);

        codeInputsCopy.splice(destination.index, 0, selected);
        const sortedCodeBlocks = sortCodeInputs(codeInputsCopy)
        setCodeInputs(sortedCodeBlocks);
        localStorage.setItem('codeInputs', JSON.stringify(sortedCodeBlocks))
      };

      const sortCodeInputs = (changedCodeInputs) => {
        const copyCodeBlocks = [...changedCodeInputs]
        copyCodeBlocks.sort(
          (first, second) => {
            return first.index < second.index ? -1 : 1
          }
        );
        return copyCodeBlocks
      }

      const getOrderedCodeBlocks = () => {
        const copyCodeBlocks = [...codeInputs]
        copyCodeBlocks.sort(
          (first, second) => {
            return first.index < second.index ? -1 : 1
          }
        );
        return copyCodeBlocks
      }

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
                                className={`${styles.container} ${snapshot.isDraggingOver ? styles.isdragging : styles.notdragging}`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                            {getOrderedCodeBlocks().map(({id, index, value}) => (
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
