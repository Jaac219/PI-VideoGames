import style from './error404.module.css';

export default function Error404(){
  const { PUBLIC_URL } = process.env;
  return(
    <div className={style.container}>
      <div className={style.elements}>
        <img src={PUBLIC_URL+"/images/error404.png"} alt="" />
        <h1>Error 404</h1>
        <h3>Pagina no encontrada</h3>
      </div>
    </div>
  )
}