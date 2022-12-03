import styles from './modal.module.css'

export default function Modal({children, stateController}) {
  const handleCloseModal = _ => {
    stateController(false)
  }
  return (
    <div className={styles.modalCover}>
      <div className={styles.modal}>
      <button onClick={handleCloseModal}>Close</button>
        {children}
      </div>
    </div>
  )
}
