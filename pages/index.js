import Head from 'next/head'
import { useState, useEffect } from 'react'
import SettingsModal from '../src/components/SettingsModal'
import styles from '../styles/Home.module.css'
import { getCodeBlocksOnStorage } from '../src/utils/localstorage'
import CodeBlock from '../src/components/CodeBlock'


export default function Home() {
  const [codeBlocks, setCodeBlocks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const savedBlocks = getCodeBlocksOnStorage(localStorage)
    setCodeBlocks(savedBlocks)
  }, [])

  const getOrderedCodeBlocks = () => {
    const copyCodeBlocks = [...codeBlocks]
    copyCodeBlocks.sort(
      (first, second) => {
        return first.index < second.index ? -1 : 1
      }
    );
    return copyCodeBlocks
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Code Writer</title>
        <meta name="description" content="Code Writer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Code Writer</h1>
      <button onClick={() => {setIsModalOpen(true)}}>Settings</button>
      {
        isModalOpen ?
          <SettingsModal stateController={setIsModalOpen}/>
        : null
      }
      <div className={styles.codeBlocks}>
        {
          getOrderedCodeBlocks().map(({id, value}) => {
            return <CodeBlock key={id} codeId={id} code={value}/>
          })
        }
      </div>
    </div>
  )
}
