import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import * as S from './styles'
import Qr from 'qrcode.react';

//componentes

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function QrCode() {

    const [mac, setMac] = useState();
    const [redirect, setRedirect] = useState(false);

    async function saveMac(){
        if(!mac)
            alert('Você precisa informar o código que aparece em seu dispositivo');
        else{
            await localStorage.setItem('@todo/macaddress', mac);
        setRedirect(true);
        window.location.reload();
        }
        
    }

    return (
        <S.Container>
            {redirect && <Redirect to="/"/>}
            <Header/>
            <S.Content>
                <h1>CAPTURE O QRCODE PELO APP</h1>
                <p>Suas atividades serão sincronizadas com a de seu celular</p>
                <S.QrcodeArea>
                    <Qr value='getmacaddress' size={350}/>
                </S.QrcodeArea>
                <S.ValidationCode>
                    <span>Digite o código que aparece em seu celular</span>
                    <input type="text" onChange={e => setMac(e.target.value)} value={mac}/>
                    <button type="button" onClick={saveMac}>SINCRONIZAR</button>
                </S.ValidationCode>
            </S.Content>
            <Footer/>
        </S.Container>
    )
}

export default QrCode;