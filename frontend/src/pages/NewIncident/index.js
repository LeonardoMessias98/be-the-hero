import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'

import './style.css'

import logoImg from '../../assets/logo.svg';

export default function Register(){

  const [title,setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value,setValue] = useState('');

  const history = useHistory();

  const ongID = localStorage.getItem('ongID');

  async function handleNewIncident(event){
    event.preventDefault();

    const data = {
      title,
      description,
      value,
    }

    try{
      await api.post('incidents', data, {
        headers:{
          Authorization: ongID,
        }
      })

      history.push('/profile')
    }catch(err){
      alert("Falha ao cadastrar novo caso, tente novamente")
    }
  }
  
  return (
    <div className="newIncident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um Herói para resolver isso.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input 
            placeholder="Valor em Reais"
            value={value}
            onChange={e => setValue(e.target.value)}
            />

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}