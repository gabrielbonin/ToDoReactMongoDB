import styled from 'styled-components';

export const Container = styled.div `
width: 260px;
height: 60px;
background-color: ${props=>props.actived ? '#EE6B26' : '#20295F'};
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: space-around;
padding: 10px;
cursor: pointer;


img{
width: 25px;
height: 25px;
}

span{
    color: white;
    font-weight: bold;
    align-self: flex-end;
    font-size: 18px;
}

&:hover{
    background-color: #EE6B26;
}


`