import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import styled from 'styled-components';

interface props {
    disabled: boolean;
    content: string;
    buttonAction: Function;
    isLoading?: boolean;
}

const Button = styled.button`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    background: rgb(109, 104, 255);
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;

    &:hover{
        background: rgb(109, 104, 155);
        cursor: pointer;
    }

    &:disabled{
        background: rgb(109, 104, 255, 0.3);
        &:hover{
            cursor: not-allowed;
        }
    }
`;

const ButtonComponent = ({disabled, content, buttonAction, isLoading}:props)=>{
    return (
        <Button
            disabled = { disabled }
            onClick = { () => buttonAction() }
        >
            { isLoading ? <BeatLoader color = '#ffffff' size = "8px"/> : <span>{ content }</span> }
        </Button>
    )
}

export default ButtonComponent;