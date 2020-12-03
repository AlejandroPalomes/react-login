import React, {useState} from 'react';
import styled from 'styled-components';

interface props {
    hide: boolean;
    placeholder: string;
    updateValue: Function;
}

const Container = styled.div`
    flex-grow: 1;
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding: 0 13px;
    border: solid 1px rgb(210, 214, 220);
    border-radius: 7px;
`;

const StyledInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    flex-grow: 1;
    font-size: 18px;
    color: rgb(22, 30, 46);
    background: white;
    border: none;

    &:focus{
        outline: none;
    }
`;

const StyledButton = styled.button`
    display: none;
    padding: 5px;
    font-size: 14px;
    color: rgb(22, 30, 46);
    background: rgba(109, 104, 255, 0.1);
    border: none;
    border-radius: 7px;
    transition: 0.3s ease;

    &:hover{
        cursor: pointer;
        background: rgba(109, 104, 255, 0.2);
    }

    &:focus{
        outline: none;
    }

    @media (min-width: 576px){
        display: inline;
    }
`;

const Input = ({hide, placeholder, updateValue}:props)=>{

    const [show, setShow] = useState(!hide);
    const handleClick = () => setShow(!show);

    const hideBtn = hide ? <StyledButton onClick = { handleClick }>{ show ? 'Hide' : 'Show' }</StyledButton> : '';

    return (
        <Container>
            <StyledInput
                placeholder = { placeholder }
                type = { show ? 'text' : 'password' }
                onChange = { e => updateValue(e.target.value) }
            />
            { hideBtn }
        </Container>
    )

}

export default Input;