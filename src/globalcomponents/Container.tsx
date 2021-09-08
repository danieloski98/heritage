import styled from 'styled-components/native'
import { theme } from '../utils/theme';

const Container = styled.View`
    width: ${ props => props.width ? props.width: '0%' };
    height: ${ props => props.height ? props.height : '0%' };
    background-color: ${ props => props.bgColor ? props.bgColor: 'white'};
    flex-direction: ${ props => props.flexDirection ? props.flexDirection : 'column'};
    justify-content: ${ props => props.justifyContent ? props.justifyContent : 'flex-end'};
    align-items: ${ props => props.alignItems ? props.alignItems : 'flex-end'};
    display: flex;
    padding-top: ${ props => props.paddingTop ? props.paddingTop: '0px'};
    padding-left: ${ props => props.paddingLeft ? props.paddingLeft : '0px'};
    padding-right: ${ props => props.paddingRight ? props.paddingRight : '0px'};
    padding-bottom: ${ props => props.paddingBottom ? props.paddingBottom : '0px'};
    margin-top: ${ props => props.marginTop ? props.marginTop: '0px'};
    margin-left: ${ props => props.marginLeft ? props.marginLeft : '0px'};
    margin-right: ${ props => props.marginRight ? props.marginRight : '0px'};
    margin-bottom: ${ props => props.marginBottom ? props.marginBottom : '0px'};
    border-radius: ${ props => props.borderRadius ? props.borderRadius : '0px' };
`;

export default Container;