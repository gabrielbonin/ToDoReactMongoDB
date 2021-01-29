import styled from 'styled-components';

export const Container = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`

export const Content = styled.div `
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    color: #EE6B26;
  }

  P{
    color: #20295f;
  }
`

export const QrcodeArea = styled.div `
  width: 100%;
  display: flex;
  justify-content: center;

`

export const ValidationCode =styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;


  span{
    text-transform: uppercase;
    font-weight: bold;
  }


  input{
    font-size: 18px;
    padding: 10px;
    text-align: center;
  }


  button{
    font-weight: bold;
    background-color: #EE6B26;
    color: white;
    font-size: 18px;
    padding: 10px;
    border-radius: 30px;
    cursor: pointer;
    margin-top: 10px;

    &:hover{
      background: #20295F;
    }
  }


`
