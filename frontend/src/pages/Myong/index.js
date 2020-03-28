import React,{useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'

import './style.css';
import logoImg from '../../assets/logo.svg';

export default function Register(){

  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [whatsapp,setWhatsapp] = useState()
  const [city,setCity] = useState()
  const [uf,setUf] = useState()

  const history = useHistory();
  
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongID');

  async function handleDelete(event){
    
    event.preventDefault();

    try{
      await api.delete('ongs',{
        headers:{
          Authorization: ongId,
        }
      });
      
      alert(`Seu ONG ${ongName} do ID ${ongId} foi deletada`)

      localStorage.clear();

      history.push('/')

    }catch(err){
      alert('Falha ao deletar, tente novamente');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>{ongName}</h1>
          <p>Este é o perfil da sua ONG {ongName}<br/>a seguir algumas funcionalidades</p>

          <button className="button" onClick={handleDelete}>
            Deletar ONG 
            <FiTrash2 id="lixo" />  
          </button>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar
          </Link>
        </section>

        <form onSubmit={() =>{}}>
          <input 
            placeholder="Mudar nome da ONG"
            value={name}
            onChange={e=> setName(e.target.value)}
            />

          <input type="Mudar email" 
            placeholder="Email"
            value={email}
            onChange={e=> setEmail(e.target.value)}
            />

          <input 
            placeholder="Mudar Whatsapp"
            value={whatsapp}
            onChange={e=> setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="Mudar cidade"
              value={city}
              onChange={e=> setCity(e.target.value)}
              />

            <input 
              placeholder="UF"
              value={uf}
              onChange={e=> setUf(e.target.value)}
              style={{width:80}}
              />
          </div>

          <button className="button">Aplicar Mudanças</button>
          
        </form>
      </div>
    </div>
  )
}