import style from './Login.module.css';
import { useEffect, useState } from 'react';
import { login } from '../../redux/actions/actions.js'
import { useDispatch } from 'react-redux';
import md5 from 'md5';

function validateForm({email, password}){
  let errors = {}
  if(!email) errors.email = 'Este campo es obligatorio';
  if(!password) errors.password = 'Este campo es obligatorio';
  return errors;
}

export default function Login(){
  const [form, setForm] = useState({email: '', password: ''});
  const [errorForm, setErrorForm] = useState(form);
  const dispatch = useDispatch();

  useEffect(()=>{setErrorForm(validateForm(form))}, [form])

  function handlerChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }
  
  function handlerSubmit(e){
    e.preventDefault();
    if (!Object.keys(errorForm)[0]) {
      form.password = md5(form.password);
      dispatch(login(form));
    }
  }

  return (
    <div className={style.loginContainer}>
      <form onSubmit={(e)=>{handlerSubmit(e)}} className={style.loginForm}>
        <span className={style.title}>
        <i className="fa fa-lock" aria-hidden="true"></i>
        </span>
        <input required onChange={(e)=>{handlerChange(e)}} name="email" type="email" className={style.email} placeholder="Email" />
        {errorForm.email && <label>{errorForm.email}</label>}
        <input required onChange={(e)=>{handlerChange(e)}} name="password" type="password" className={style.password} placeholder="Password" />
        {errorForm.password && <label>{errorForm.password}</label>}
        <button type="submit" name="Login" className={style.submit}>Login</button>
      </form>
    </div>
  )
}