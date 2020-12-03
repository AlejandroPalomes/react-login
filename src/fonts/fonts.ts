import { createGlobalStyle } from 'styled-components';
import Permanent from './PermanentMarker-Regular.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Permanent';
        src: url(${Permanent}) format('truetype');
    }

    body {
        margin: 0;
        font-family: 'Arial', sans-serif;
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
`;