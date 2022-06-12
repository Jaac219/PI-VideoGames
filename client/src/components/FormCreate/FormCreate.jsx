import style from './formCreate.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewGame, getGenres, getPlatforms, getGameDetail, actionUpdate } from '../../redux/actions/actions.js';

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


export default function FormCreate({modal, onClose, gameId}){
  const stateGenres = useSelector((state)=>state.genres);
  const statePlatforms = useSelector((state)=>state.platforms);
  const gameDetail = useSelector((state)=>state.videogame);
  const {error, success} = useSelector((state)=>state);


  let frm = {name: '', description: '', released: '', rating: '', background_image: '', genres: [], platforms: []};
  const [stateForm, setStateForm] = useState(frm);
  const [stateError, setStateError] = useState({});
  
  const dispatch = useDispatch();

  useEffect(()=>{setStateError(validate(stateForm))},[stateForm]);
  useEffect(()=>{if(modal && gameDetail.id) setStateForm(gameDetail)},[gameDetail]);

  useEffect(()=>{
    if(!modal){
      if(success){
        alert(success);
        window.location.reload();
      }if(error){
        alert(error);
        window.location.reload();
      } 
    }
  },[error, success]);
  
  useEffect(()=>{
    dispatch(getGenres());
    dispatch(getPlatforms());
    if(gameId) dispatch(getGameDetail(gameId));
  }, [dispatch]);


  function handleChange(e){
    setStateForm({
      ...stateForm,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    
    if (!Object.keys(stateError)[0]){
      if (modal){
        if (window.confirm('Seguro que quiere modificar este juego')) {
          dispatch(actionUpdate(stateForm))
        }
      }else {
        dispatch(setNewGame(stateForm))
      }
    }else{
      alert('Error en el formulario');
    }
  }


  //Se recibe por parametro si se va agregar genero o Platforma, se obtiene el valor de su respectivo select,
  //en arrBack se verifica si el valor ya existe en su respectivo array de ser asi se filtra para sacarlo e ingresarlo
  //nuevamente una unica vez
  function add(selection){
    let valor = document.getElementById(selection+'Id');
    let name = valor.options[valor.selectedIndex].text;
    if (valor.value) {
      //esto es para que no sse agregen generos o plataformas repetidas
      let arrBack = stateForm[selection].filter((v)=>v.id != valor.value);
      setStateForm({
        ...stateForm,
        [selection]: [...arrBack, {id: valor.value, name: name}]
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
      [selection]: stateForm[selection].filter(val=>val.id!=id)
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
        <h1>{!modal ? 'Register a new game': 'Edit Game'}</h1>
        <div className={style.groupOne}>
          <div>
            <label htmlFor="">Name: </label>
            <input className={stateError.name && 'inputError'} onChange={(e)=>{handleChange(e)}}  name="name" type="text" value={stateForm.name ? stateForm.name: ''} />
            {stateError.name && (<p className='inputError'>{stateError.name}</p>)}
          </div>
          <div>
            <label htmlFor="">Date Released: </label>
            <input className={stateError.released && 'inputError'} onChange={(e)=>{handleChange(e)}} name="released" type="date" value={stateForm.released ? stateForm.released: ''} />
            {stateError.released && (<p className='inputError'>{stateError.released}</p>)}
          </div>
          <div>
            <label htmlFor="">Raiting: </label>
            <input className={stateError.rating && 'inputError'} onChange={(e)=>{handleChange(e)}} name="rating" step="0.01" type="number" value={stateForm.rating ? stateForm.rating: ''}/>
            {stateError.rating && (<p className='inputError'>{stateError.rating}</p>)}
          </div>
        </div>
        <div className={style.description}>
          <label htmlFor="">Description: </label>
          <textarea className={stateError.description && 'inputError'} onChange={(e)=>{handleChange(e)}} name="description" cols="10" rows="1" value={stateForm.description ? stateForm.description: ''}></textarea>
          {stateError.description && (<p className='inputError'>{stateError.description}</p>)}
        </div>
        <div className={style.groupTwo}>
          <div>
            <input id='imageFile' type="file" className={style.btnImage} accept="image/*" onChange={()=>{createImage()}}/>
            {stateForm.background_image ? 
              <img className={style.imgAdd} src={stateForm.background_image} width="20px" height="20px" alt="" />: 
              <i className="fa fa-ban" style={{color: "red", margin: "auto"}} aria-hidden="true"></i>
            }
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
            {stateForm.genres[0] && stateForm.genres.map(val=>{
                return (
                  <div key={val.id}>
                    <label> {val.name}</label>
                    <button onClick={()=>{deleteSel('genres', val.id)}}><i className="fa fa-times" aria-hidden="true"></i></button>
                  </div>
                )
              })
            }
            {/* {stateGenres && stateGenres.filter(vl=>stateForm.genres.find(id=>vl.id==id))
              .map(val=>{
                return (
                  <div key={val.id}>
                    <label> {val.name}</label>
                    <button onClick={()=>{deleteSel('genres', val.id)}}><i className="fa fa-times" aria-hidden="true"></i></button>
                  </div>
                )
              })
            } */}
          </div>
          <div>
            {stateForm.platforms[0] && stateForm.platforms
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
        {!modal ?
          <div className={style.btnSubmit}>
            <button>Register <i className='fa fa-paper-plane' aria-hidden="true"></i></button>
          </div> :
          <div className={style.containerBtnSm}>
            <button onClick={()=>{onClose()}} type='button' className={style.buttonSm}>Close</button>
            <button type='submit' className={style.buttonSm}>Update</button>
          </div>
        }
      </form>
    </div>
  );
}