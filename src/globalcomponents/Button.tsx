import styled from 'styled-components/native'
import { theme } from '../utils/theme';

const Button = styled.View`
    width: 100%;
    background-color: ${theme.primaryBackgroundColor};
    borderRadius: ${10};
    height: ${theme.buttonHeight};
    justify-content: center;
    align-items: center
`;

export default Button;
