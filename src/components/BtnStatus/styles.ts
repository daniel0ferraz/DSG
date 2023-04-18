import styled, { css } from "styled-components/native";


import IBtnStatusProps from "./index";

export const Buttom = styled.TouchableOpacity`
  width: 82px;
  background: #E5EAFC;
  
  border: ${props => props.isActive ? " 1px solid #6FEA8B" : 'none'};
  border-radius: 75px;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;


