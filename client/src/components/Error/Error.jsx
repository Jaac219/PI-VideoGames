export default function Error({error, path=''}){
  const { PUBLIC_URL } = process.env;
  return(
    <div className='responseError'>
        <img src={PUBLIC_URL + '/images/error.png'} alt="" />
        <h1>{error ? error : 'Sin resultados'}</h1>
    </div>
  )
}