import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import * as S from './styles'
import api from '../../services/api';
import TypeIcons from '../../utils/typeIcons';
import {format} from 'date-fns';
//componentes

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import isConneceted from '../../utils/isConnected';


function Task({match}) {
    const [redirect, setRedirect] = useState(false);
    
    const [type, setType] = useState();
    const [done, setDone] = useState(false);
    const [id, setId] = useState();
    const [tittle, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    
    
  
    
    async function LoadTaskDetails(){
        await api.get(`/task/${match.params.id}`)
        .then(response =>{
            setType(response.data.type)
            setTitle(response.data.tittle)
            setDone(response.data.done)
            setDescription(response.data.description)
            setDate(format (new Date(response.data.when), 'yyyy-MM-dd'))
            setHour(format (new Date(response.data.when), 'HH:mm'))
        })
        
    }


    async function Save(){

        if(!tittle)
        return alert("Você precisa informar o titulo da tarefa")
        else if(!description)
        return alert("Você precisa informar a descrição da tarefa")
        else if(!type)
        return alert("Você precisa informar o tipo da tarefa")
        else if(!date)
        return alert("Você precisa informar a data da tarefa")
        else if(!hour)
        return alert("Você precisa informar o horário da tarefa")

        if(match.params.id){
            await api.put(`/task/${match.params.id}`, {
                macaddress : isConneceted,
                done,
                type,
                tittle,
                description,
                when: `${date}T${hour}:00.000`
            }).then(() =>
                setRedirect(true)
            )
        }else{
            await api.post('/task', {
                macaddress : isConneceted,
                type,
                tittle,
                description,
                when: `${date}T${hour}:00.000`
            }).then(() =>
                setRedirect(true)
            )
        }
    }

    async function Remove(){
        const res = window.confirm("Deseja realmente excluir esta tarefa?")
        if(res==true){
            await api.delete(`/task/${match.params.id}`)
            .then(() => setRedirect(true))
        }
    }


    useEffect(() =>{
        LoadTaskDetails();
        if(!isConneceted){
            setRedirect(true);
        }
    }, [])

   
    
    return (
        <S.Container>
           {redirect && <Redirect to="/"/>}
            <Header/>
                <S.Form>
                    <S.TypeIcons>
                    {
                        TypeIcons.map((icon, index) =>(
                            index > 0 &&
                            <button type="button" onClick = {() =>setType(index)}>
                            <img src={icon} alt="Tipo da tarefa" 
                            className = {type && type != index  && 'inative'}/>
                            </button>
                        ))
                    }
                </S.TypeIcons>

                <S.Input>
                    <span>Titulo</span>
                    <input type="text" placeholder="Digite o titulo da tarefa"
                    onChange={e => setTitle(e.target.value)} value={tittle} />
                    
                </S.Input>
                <S.TextArea>
                    <span>Descrição</span>
                    <textarea rows={5} placeholder="Detalhes da tarefa"  
                    onChange={e => setDescription(e.target.value)} value={description} />
        
                </S.TextArea>
                <S.Input>
                    <span>Data</span>
                    <input type="date" placeholder="Digite a data da tarefa"
                     onChange={e => setDate(e.target.value)} value={date} />
                </S.Input>
                <S.Input>
                    <span>Hora</span>
                    <input type="time" placeholder="Digite a hora da tarefa"
                     onChange={e => setHour(e.target.value)} value={hour} />
                </S.Input>
                <S.Options>
                    <div>
                        <input type="checkbox" checked={done}
                         onChange={() => setDone(!done)} />
                        <span>CONCLUÍDO</span>
                    </div>
                    {match.params.id && <button type="button" onClick={Remove}>EXCLUIR</button>}
                </S.Options>
                <S.Save>
                    <button type="button" onClick={Save}>SALVAR</button>
                </S.Save>
            </S.Form>
            <Footer/>
        </S.Container>
    )    
}
export default Task;