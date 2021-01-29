import styled from 'styled-components';

export const Container = styled.div `
width: 100%;
height: 70px;
background-color: #20295F;
border-bottom: 3px solid #EE6B26;
display: flex;
`

export const LeftSide = styled.div `
width: 50%;
height: 70px;
display: flex;
align-items: center;
padding-left: 5px;

img{
    height: 40px;
    width: 100px;
}
`

export const RightSide = styled.div `
width: 50%;
height: 70px;
display: flex;
align-items: center;
justify-content: flex-end;

button{
    background: none;
    border: none;
    cursor: pointer;
}

a, button{
    color: white;
    font-weight: bold;
    text-decoration: none;
    margin: 0 10px;

    &:hover{
        color: #EE6B26;
    }
}

#notification{
    img, button{
        width: 25px;
        height: 30px;
    }
    span, button{
        background-color: white;
        color: #EE6B26; 
        padding: 3px 7px;
        border-radius: 50%;
        position: relative;
        top: -20px;
        right: 10px;
    }

    &:hover{
        opacity: 0.5;
    }
}

.divider::after{
    content: "|";
    margin: 0px 10px;
    color: white;
}

button{
    font-size: 16px;
}
`