import React from 'react';
import styled from 'styled-components';

interface props {
    children: any;
    width: number;
}

const Container = styled.div`
width: ${({width}:props) => width}px;
padding: 50px;
display: flex;
flex-direction: column;
background: white;
border-radius: 7px;
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.span`
color: red;
`;

const Card = ({children, width}:props)=>{
    return (
        <Container 
            width = {width}
        >
            {children}
        </Container>
    )
}

export default Card;