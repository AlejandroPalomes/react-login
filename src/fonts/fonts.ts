import { createGlobalStyle } from 'styled-components';
import Permanent from './PermanentMarker-Regular.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Permanent';
        src: url(${Permanent}) format('truetype');
    }

    *{
        font-family: 'Arial', sans-serif
    }
`;