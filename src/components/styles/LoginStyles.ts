import styled from 'styled-components';
import { Link } from "react-router-dom";
import Logo from '../Logo';

export const MainWrapper = styled.div`
min-height: 100vh;
display: flex;
justify-content: space-between;
align-items: center;
`;

export const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    z-index: -1;
    position: absolute;
    max-width: 100vw;
    flex-grow: 1;
    height: 100vh;
    opacity: 0.3;

    h3{
        display: none;
        font-family: "Permanent";
        font-size: 68px;
        color: rgb(109, 104, 255);
        text-align: center;
    }

    img{
        width: 1500px;
        margin-bottom: 0;
    }

    @media (min-width: 992px){
        justify-content: center;
        margin-left: 50px;
        opacity: 1;
        position: relative;

        h3{
            display: block;
        }

        img{
            display: none;
        }
    }

    @media (min-width: 1211px){
        justify-content: space-between;

        h3{
            font-size: 84px;
            margin: 100px 0 0 0;
        }

        img{
            display: block;
            width: 100%;
            margin-bottom: 10px;
        }
    }
`;

export const FormWrapper = styled.div`
    width: 100%;
    min-width: 355px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 992px){
        width: 30%;
        align-items: space-between;
        margin: 0 50px;
    }
`;

export const LogoContainer = styled.div`
    margin-bottom: 50px;
    padding-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledLogo = styled(Logo)`
    display: none;

    @media(min-width: 375px){
        display: inline;
    }
`;

export const Name = styled.h1`
    font-size: 60px;
    font-family: "Permanent";
    color: rgb(109, 104, 255);
    margin: 0 0 0 10px;
`;

export const StyledSpan = styled.span`
    font-size: 18px;
    color: rgb(22, 30, 46);
    text-align: center;
`;

export const StyledLink = styled(Link)`
    color: rgb(109, 104, 255);
    font-weight: bold;
    text-decoration: none;
`;

export const StyledLink2 = styled(Link)`
    margin-top: 15px;
    color: rgb(109, 104, 255);
    font-weight: light;
    font-size: 12px;
    text-align: center;
    text-decoration: none;
`;