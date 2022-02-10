import styled from 'styled-components/native'
import { theme } from '../utils/theme';

const Text = styled.Text`
    font-size: ${props => props.fontSize ? props.fontSize : '14px'};
    font-family: ${props => props.fontFamily ? props.fontFamily: 'Inter-Regular'};
    color: ${ props => props.color ? props.color : theme.inactiveText };
    text-align: ${ props => props.textAlign ? props.textAlign : 'left'};
    padding-top: ${ props => props.paddingTop ? props.paddingTop: '0px'};
    padding-left: ${ props => props.paddingLeft ? props.paddingLeft : '0px'};
    padding-right: ${ props => props.paddingRight ? props.paddingRight : '0px'};
    padding-bottom: ${ props => props.paddingBottom ? props.paddingBottom : '0px'};
    margin-top: ${ props => props.marginTop ? props.marginTop: '0px'};
    margin-left: ${ props => props.marginLeft ? props.marginLeft : '0px'};
    margin-right: ${ props => props.marginRight ? props.marginRight : '0px'};
    margin-bottom: ${ props => props.marginBottom ? props.marginBottom : '0px'};
    font-weight: ${ props => props.fontWeight ? props.fontWeight : '500' }
`;

export default Text;