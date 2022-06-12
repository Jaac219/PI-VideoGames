export default function Error({error, path=''}){
  return(
    <div className='responseError'>
        <img src={window.location.origin + '/images/error.png'} alt="" />
        <h1>{error ? error : 'Sin resultados'}</h1>
    </div>
  )
}