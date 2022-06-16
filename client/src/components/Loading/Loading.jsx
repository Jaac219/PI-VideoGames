export default function(){
  const { PUBLIC_URL } = process.env;
  return (
    <div className='loading'>
      <img src={PUBLIC_URL+'/images/loading.gif'} alt="" />
      <h1>Loading...</h1>
    </div>
  )
}