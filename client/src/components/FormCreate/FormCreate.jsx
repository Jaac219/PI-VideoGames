import { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewGame, getGenres, getPlataforms } from '../../redux/actions/actions.js';

function validate(form){
  const regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  let errors = {}
  if (!form.name) errors.name = 'Name is required';
  if (!form.description) errors.description = 'Description is required';
  if (form.released && !form.released.match(regexDate)) errors.released = 'Format date no valid';
  if (form.rating){
    if (Number.isNaN(Number.parseFloat(form.rating))) errors.rating = 'Rating is not number'
    else if (form.rating < 0) errors.rating = 'The value must be positive'
  } 
  if (!form.genres[0]) errors.genres = 'Genres is required';
  if (!form.plataforms[0]) errors.plataforms = 'Plataforms is required';
  return errors;
}


export default function FormCreate(){
  const [stateForm, setStateForm] = useState({
    name: '',
    description: '',
    released: '',
    rating: '',
    image_url: '',
    genres: [],
    plataforms: []
  });
  const [stateError, setStateError] = useState({});
  
  const dispatch = useDispatch();
  const stateGenres = useSelector((state)=>state.genres);
  const statePlataforms = useSelector((state)=>state.plataforms);
  const responseServer = useSelector((state)=>state.responseServer);

  useEffect(()=>{setStateError(validate(stateForm))},[stateForm]);
  useEffect(()=>{
    if(responseServer.data){
      alert(responseServer.data);
      window.location.reload();
    }
    if (responseServer.message) alert(responseServer.message)
  },[responseServer]);
  useEffect(()=>{
    dispatch(getGenres());
    dispatch(getPlataforms());
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
    }
  }


  //Se recibe por parametro si se va agregar genero o plataforma, se obtiene el valor de su respectivo select,
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

  return (
    <form onSubmit={(e)=>{handleSubmit(e)}}>

      <label htmlFor="">Name: </label>
      <input className={stateError.name && 'inputError'} onChange={(e)=>{handleChange(e)}}  name="name" type="text" />
      {stateError.name && (<p className='inputError'>{stateError.name}</p>)}

      <label htmlFor="">Description: </label>
      <textarea className={stateError.description && 'inputError'} onChange={(e)=>{handleChange(e)}} name="description" cols="10" rows="1"></textarea>
      {stateError.description && (<p className='inputError'>{stateError.description}</p>)}

      <label htmlFor="">Date Released: </label>
      <input className={stateError.released && 'inputError'} onChange={(e)=>{handleChange(e)}} name="released" type="date"  />
      {stateError.released && (<p className='inputError'>{stateError.released}</p>)}

      <label htmlFor="">Raiting: </label>
      <input className={stateError.rating && 'inputError'} onChange={(e)=>{handleChange(e)}} name="rating" step="0.01" type="number" />
      {stateError.rating && (<p className='inputError'>{stateError.rating}</p>)}

      <label htmlFor="">Image: </label>
      <input onChange={(e)=>{handleChange(e)}} name='image_url' type="text" />

      <select className={stateError.genres && 'selectError'} name='genre' id='genresId'>
        <option key={0} value="">Select genre</option>
        {stateGenres && stateGenres.map((val)=>{
          return (
            <option key={val.id} value={val.id}>{val.name}</option>
          )
        })}
      </select>
      {stateError.genres && (<p className='selectError'>{stateError.genres}</p>)}
      <button type='button' onClick={()=>{add('genres')}}>+</button>

      <select className={stateError.plataforms && 'selectError'} name='plataform' id='plataformsId'>
        <option key={0} value="">Select plataform</option>
        {statePlataforms && statePlataforms.map((val)=>{
          return (
            <option key={val.id} value={val.id}>{val.name}</option>
          )
        })}
      </select>
      {stateError.plataforms && (<p className='selectError'>{stateError.plataforms}</p>)}
      <button type='button' onClick={()=>{add('plataforms')}}>+</button>
      
      {/* Pinta en pantalla todos los generos y plataformas del estado en redux,
      filtrandolos por el id de generos y plataformas seleccionados en el estado local */}
      {stateGenres && stateGenres.filter(vl=>stateForm.genres.find(id=>vl.id==id))
        .map(val=>{
          return (
            <div key={val.id}>{val.name} 
              <button onClick={()=>{deleteSel('genres', val.id)}}>x</button>
            </div>
          )
        })
      }
      {statePlataforms && statePlataforms.filter(vl=>stateForm.plataforms.find(id=>vl.id==id))
        .map(val=>{
          return (
            <div key={val.id}>{val.name} 
              <button onClick={()=>{deleteSel('plataforms', val.id)}}>x</button>
            </div>
          )
        })
      }

      <button>Register</button>
    </form>
  );
}