import style from './modalEdit.module.css'
import FormCreate from '../FormCreate/FormCreate.jsx'

export default function ModalEdit({show, onClose, gameId}){
  if(!show) return null;
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalBody}>
          <FormCreate modal={true} onClose={onClose} gameId={gameId}/>
        </div>
      </div>
    </div>
  )
}