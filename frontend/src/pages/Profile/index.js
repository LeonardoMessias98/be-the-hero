import React,{useState,useEffect} from 'react';

import { Link,useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './style.css'

export default function Profile(){
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongID');
  const [incidents,setIncidents] = useState([]);
  const history = useHistory();

  useEffect(()=>{
    api.get('profile',{
      headers:{
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  },[ongId])

  async function handleDeleteIncident(id){
    try{
      api.delete(`incidents/${id}`,{
        headers:{
          Authorization: ongId,
        }
      });
      
      setIncidents(incidents.filter(incident => incident.id !== id));
    }catch(err){
      alert("Erro ao deletar caso, tente novamente");
    }
  }

  async function handleLogout(){
    localStorage.clear();

    history.push('/');
  }

  let [color,setColor] = useState("#e02041");

  function TurnWhite(){   
    setColor(color = "#ccc");
  }

  function TurnRed(){
    setColor(color = "#e02041");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem Vindo(a), {ongName}</span>
        
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button 
          onMouseEnter={TurnWhite} 
          onMouseLeave={TurnRed} 
          onClick={handleLogout}
          type="button">
          <FiPower id="icon" size={18} color={color}/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
          <strong>CASO:</strong>
          <p>{incident.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incident.description}</p>

          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-BR', { style: 'currency',currency: 'BRL'}).format(incident.value)}</p>

          <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size={18} color="#a8a8a8"/>
          </button>
        </li>
        ))}
      </ul>
    </div>    
  );
}