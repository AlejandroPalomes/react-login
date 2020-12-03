import React from 'react';
import styled from 'styled-components';

interface props {
    children: any;
    width?: number;
    padding?: number;
}

const StyledCard = styled.div`
    box-sizing: border-box;
    width: 90%;
    max-width: ${ ({ width } : props) => width || 0 }px;
    padding: ${ ({ padding } : props) => padding || 0 }px;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 7px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const Card = ({children, width, padding}:props)=>{
    return (
        <StyledCard
            width = { width }
            padding = { padding }
        >
            { children }
        </StyledCard>
    )
}

export default Card;