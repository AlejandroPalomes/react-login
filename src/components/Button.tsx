import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import styled from 'styled-components';

interface props {
    isDisabled: boolean;
    buttonText: string;
    onClick: Function;
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
    border-radius: 7px;

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

const ButtonComponent = ({isDisabled, buttonText, onClick, isLoading}:props)=>{
    return (
        <Button
            disabled = { isDisabled }
            onClick = { () => onClick() }
        >
            { isLoading ? <BeatLoader color = '#ffffff' size = "8px"/> : <span>{ buttonText }</span> }
        </Button>
    )
}

export default ButtonComponent;