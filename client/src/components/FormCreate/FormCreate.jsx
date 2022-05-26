import style from './formCreate.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewGame, getGenres, getPlatforms } from '../../redux/actions/actions.js';

function validate(form){
  const regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  let errors = {}
  if (!form.name) errors.name = 'Name is required';
  if (!form.description) errors.description = 'Description is required';
  if (form.released && !form.released.match(regexDate)) errors.released = 'Format date no valid';
  if (form.released){
    const today = new Date();
    const daySel = new Date(form.released)
    if (daySel > today) {
      errors.released = 'Date greater than today';
    }
  } 
  if (form.rating){
    if (Number.isNaN(Number.parseFloat(form.rating))) errors.rating = 'Rating is not number'
    else if (form.rating < 0) errors.rating = 'The value must be positive'
  } 
  if (!form.genres[0]) errors.genres = 'Genres is required';
  if (!form.platforms[0]) errors.platforms = 'Platforms is required';
  return errors;
}


export default function FormCreate(){
  const [stateForm, setStateForm] = useState({
    name: '',
    description: '',
    released: '',
    rating: '',
    background_image: '',
    genres: [],
    platforms: []
  });
  const [stateError, setStateError] = useState({});
  
  const dispatch = useDispatch();
  const stateGenres = useSelector((state)=>state.genres);
  const statePlatforms = useSelector((state)=>state.platforms);
  const responseServer = useSelector((state)=>state.responseServer);

  useEffect(()=>{setStateError(validate(stateForm))},[stateForm]);

  useEffect(()=>{
    if(responseServer.respCreate){
      alert(responseServer.respCreate);
      window.location.reload();
    }
    if (responseServer.createError){
      alert(responseServer.createError);
      window.location.reload();
    } 
  },[responseServer]);
  
  useEffect(()=>{
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, []);


  function handleChange(e){
    setStateForm({
      ...stateForm,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    
    if (!Object.keys(stateError)[0]){
      dispatch(setNewGame(stateForm));
    }else{
      alert('Error en el formulario');
    }
  }


  //Se recibe por parametro si se va agregar genero o Platforma, se obtiene el valor de su respectivo select,
  //en arrBack se verifica si el valor ya existe en su respectivo array de ser asi se filtra para sacarlo e ingresarlo
  //nuevamente una unica vez
  function add(selection){
    let valor = document.getElementById(selection+'Id').value;
    if (valor) {
      let arrBack = stateForm[selection].filter((v)=>v != valor);
      setStateForm({
        ...stateForm,
        [selection]: [...arrBack, valor]
      });
      document.getElementById(selection+'Id').value = '';
    }else{
      alert('Debe seleccionar un valor')
    }
  }
  //--------------------------------------------------------------------------------------------------------------------

  function deleteSel(selection, id){
    setStateForm({
      ...stateForm,
      [selection]: stateForm[selection].filter(val=>val!=id)
    })
  }

  function createImage(){
    setStateForm({...stateForm,  background_image: ''});
    let imagedata = document.getElementById('imageFile');

    if (imagedata.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(imagedata.files[0]);
        
      reader.onload = function () {
        setStateForm({...stateForm,  background_image: reader.result});
      };
    }
  }

  return (
    <div className={style.formContainer}>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <h1>Register a new game</h1>
        <div className={style.groupOne}>
          <div>
            <label htmlFor="">Name: </label>
            <input className={stateError.name && 'inputError'} onChange={(e)=>{handleChange(e)}}  name="name" type="text" />
            {stateError.name && (<p className='inputError'>{stateError.name}</p>)}
          </div>
          <div>
            <label htmlFor="">Date Released: </label>
            <input className={stateError.released && 'inputError'} onChange={(e)=>{handleChange(e)}} name="released" type="date"  />
            {stateError.released && (<p className='inputError'>{stateError.released}</p>)}
          </div>
          <div>
            <label htmlFor="">Raiting: </label>
            <input className={stateError.rating && 'inputError'} onChange={(e)=>{handleChange(e)}} name="rating" step="0.01" type="number" />
            {stateError.rating && (<p className='inputError'>{stateError.rating}</p>)}
          </div>
        </div>
        <div className={style.description}>
          <label htmlFor="">Description: </label>
          <textarea className={stateError.description && 'inputError'} onChange={(e)=>{handleChange(e)}} name="description" cols="10" rows="1"></textarea>
          {stateError.description && (<p className='inputError'>{stateError.description}</p>)}
        </div>
        <div className={style.groupTwo}>
          <div>
            <input id='imageFile' type="file" className={style.btnImage} accept="image/*" onChange={()=>{createImage()}}/>
            <label htmlFor="">{stateForm.background_image ? 'Imagen Seleccionada ': 
              'Ningún archivo seleccionado:'} 
            </label>
            {/* <input onChange={(e)=>{handleChange(e)}} name='image_url' type="text" /> */}
          </div>
          <div>
            <select className={stateError.genres && 'selectError'} name='genre' id='genresId'>
              <option key={0} value="">Select genre</option>
              {stateGenres && stateGenres.map((val)=>{
                return (
                  <option key={val.id} value={val.id}>{val.name}</option>
                  )
                })}
            </select>
            <button type='button' onClick={()=>{add('genres')}}><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
            {stateError.genres && (<p className='selectError'>{stateError.genres}</p>)}
          </div>
          <div>
            <select className={stateError.platforms && 'selectError'} name='platform' id='platformsId'>
              <option key={0} value="">Select Platform</option>
              {statePlatforms && statePlatforms.map((val)=>{
                return (
                  <option key={val.id} value={val.id}>{val.name}</option>
                  )
                })}
            </select>
            <button type='button' onClick={()=>{add('platforms')}}><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
            {stateError.platforms && (<p className='selectError'>{stateError.platforms}</p>)}
          </div>
        </div>
        
        {/* Pinta en pantalla todos los generos y Platformas en el estado global,
        filtrandolos por el id de generos y Platformas seleccionados en el estado local */}
        <div className={style.groupThree}>
          <div>
            {stateGenres && stateGenres.filter(vl=>stateForm.genres.find(id=>vl.id==id))
              .map(val=>{
                return (
                  <div key={val.id}>
                    <label> {val.name}</label>
                    <button onClick={()=>{deleteSel('genres', val.id)}}><i className="fa fa-times" aria-hidden="true"></i></button>
                  </div>
                )
              })
            }
          </div>
          <div>
            {statePlatforms && statePlatforms.filter(vl=>stateForm.platforms.find(id=>vl.id==id))
              .map(val=>{
                return (
                  <div key={val.id}>
                    <label> {val.name}</label>
                    <button onClick={()=>{deleteSel('platforms', val.id)}}><i className="fa fa-times" aria-hidden="true"></i></button>
                  </div>
                )
              })
            }
          </div>
        </div>


        <div className={style.btnSubmit}>
          <button>Register <i className='fa fa-paper-plane' aria-hidden="true"></i></button>
        </div>
      </form>
    </div>
  );
}