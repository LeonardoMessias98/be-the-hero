import React,{useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';
import logoImg from '../../assets/logo.svg';

const name = '';
const email = '';
const whatsapp = '';
const city = '';
const uf = '' 

const schema = Yup.object().shape({
  name: Yup.string().required("Insira o nome da sua ONG"),
  email: Yup.string().email('Insira um email valido').required('Insira seu email'),
  whatsapp: Yup.number().required("Insira o seu Whatsapp"),
  city: Yup.string().required("Insira sua Cidade"),
  uf: Yup.string().required("Insira seu UF"),
});

export default function Myong(){

  const history = useHistory();
  
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongID');


  async function handleUpdate(event){
    event.preventDefault();

    const data = {name,email,whatsapp,city,uf};
    
    try{
      await api.put('ongs', data ,{
        headers:{
          Authorization: ongId,
        }
      })

      history.push('/profile');

      alert('Informações alteradas com sucesso!');
    }catch(err){
      console.log(err);
      alert('Não foi possivel alterar, verifique campos nulos');
    }
  }

  async function handleDelete(event){
    
    event.preventDefault();

    try{
      await api.delete('ongs',{
        headers:{
          Authorization: ongId,
        }
      });
      
      alert(`Sua ONG ${ongName} do ID ${ongId} foi deletada`)

      localStorage.clear();

      history.push('/');

    }catch(err){
      alert('Falha ao deletar, tente novamente');
    }
  }

  return (
    <div className="myong-container">
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

        <Form schema={schema} onSubmit={() =>{}}>
          <Input 
            name="name"
            placeholder="Mudar nome da ONG"
            />

          <Input 
            name="email"type="Mudar email" 
            placeholder="Email"
            />

          <Input 
            name="whatsapp"
            placeholder="Mudar Whatsapp"
          />

          <Input 
            name="city"
            placeholder="Mudar Cidade"
          />

          <Input 
            name="uf"
            placeholder="Mudar UF"
          />

          
          <button onClick={handleUpdate} className="button">Aplicar Mudanças</button>
          
        </Form>
      </div>
    </div>
  )
}