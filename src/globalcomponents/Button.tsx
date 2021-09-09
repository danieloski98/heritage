import styled from 'styled-components/native'
import { theme } from '../utils/theme';

const Button = styled.View`
    width: 100%;
    background-color: ${ props => props.backgroundColor ? props.backgroundColor : theme.primaryBackgroundColor };
    borderRadius: ${10+'px'};
    height: ${theme.buttonHeight+'px'};
    justify-content: center;
    align-items: center
`;

export default Button;
