import React from 'react';
import styled from 'styled-components';

interface props {
    message: string;
}

const Message = styled.div`
color: red;
font-size: 12px;
`;

const ErrorMessage = ({ message } : props)=>{
    return message.length ? <Message>{ message }</Message> : <></> ;
}

export default ErrorMessage;