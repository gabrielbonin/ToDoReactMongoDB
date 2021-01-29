import React, {useState, useEffect} from 'react';
import * as S from './styles'
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';
//componentes

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';
import isConnected from '../../utils/isConnected';
function Home() {
    const [FilterActived, setFilterActived] = useState('today');
    const [tasks, setTasks] = useState([]);
    const [redirect, setRedirect] = useState(false);

    async function loadTasks(){
        await api.get(`/task/filter/${FilterActived}/${isConnected}`)
        .then(response =>{
            setTasks(response.data)
        })
    }

    useEffect(() =>{
        loadTasks();

        if(!isConnected)
        setRedirect(true)
        
    }, [FilterActived])

    

    function notification(){
        setFilterActived('late');
    }

    return (
        <S.Container>
           { redirect && <Redirect to="/qrcode"/>}
            <Header clickNotify={notification}/>
            <S.FilterArea>
                <button type="button" onClick={() => setFilterActived("all")}>
                <FilterCard title="Todos" actived={FilterActived == 'all'}/>
                </button>
                <button type="button" onClick={() => setFilterActived("today")}>
                <FilterCard title="Hoje" actived={FilterActived == 'today'}/>
                </button>
                <button type="button"   onClick={() => setFilterActived("week")}>
                <FilterCard title="Semana" actived={FilterActived == 'week'}/>
                </button>
                <button type="button" onClick={() => setFilterActived("month")}>
                <FilterCard title="Mês" actived={FilterActived == 'month'}/>
                </button>
                <button type="button" onClick={() => setFilterActived("year")}>
                <FilterCard title="Ano" actived={FilterActived == 'year'}/>
                </button>
            </S.FilterArea>
            <S.Title>
                <h3>{FilterActived == 'late' ? 'TAREFAS ATRASADAS' : 'TAREFAS'}</h3>
            </S.Title>
            <S.Content>
                {
                    tasks.map(t =>(
                        <Link to={`/task/${t._id}`}>
                            <TaskCard type={t.type} title={t.tittle} when={t.when} done={t.done} />
                        </Link>
                    ))
                }
            </S.Content>
            <Footer/>
        </S.Container>
    )    
}
export default Home;