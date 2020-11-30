import React, {useState} from 'react';
// import { Button } from "@chakra-ui/react";
import styled from 'styled-components';

interface props {
    disabled: boolean;
    content: string;
}

const Button = styled.button`
    font-size: 18px;
    text-align: center;
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

const ButtonComponent = ({disabled, content}:props)=>{

    // const [disabled, setDisabled] = useState(false);
    // const handleClick = () => setDisabled(!show)

    return (
        <Button
            // colorScheme = "blue"
            disabled = {disabled}
            // size = 'lg'
    >{content}</Button>
    )

}

export default ButtonComponent;