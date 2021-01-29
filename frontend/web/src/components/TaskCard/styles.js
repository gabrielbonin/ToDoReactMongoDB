import styled from 'styled-components';

export const Container = styled.div `
width: 250px;
height: 200px;
box-shadow: -3px 1px 13px -2px rgba(0,0,0,0.73);
border-radius: 10px;

&:hover{
    opacity: 0.5;
}
transition: all 0.3s ease;
cursor: pointer;

opacity: ${props => props.done ? 0.5 : 1};

display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

margin: 15px;
`

export const TopCard = styled.div `
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
export const BottomCard = styled.div `
width: 100%;
display: flex;
justify-content: space-around;

strong{
    color: #EE6B26;
    font-weight: bold;
}

span{
    color: #707070;
}
`