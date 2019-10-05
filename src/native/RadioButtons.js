import React from 'react';
import styled from 'styled-components/native';

const RadioButtons = props => {
  const updateThisRadioGroup = updateSelectValue(props.radioGroupId);
  return (
    <RadioButtonsContainer>
      {props.btns.map(btnProps => (
        <RadioButton {...btnProps} selectRadioButton={updateThisRadioGroup}/>
      ))}
    </RadioButtonsContainer>
  );
};

const RadioButtonsContainer = styled.View`
  flex-direction: ${props => props.btnGroupDirection || 'row'}
`;

const RadioButton = ({id, isSelected, label, selectRadioButton, btnLabelDirection}) => {
  const selectThisRadioButton = selectRadioButton(id);
  return (
    <Label key={id} direction={btnLabelDirection} onPress={selectThisRadioButton}>
      <OuterCircle isSelected={isSelected} >
        <InnerCircle isSelected={isSelected} />
      </OuterCircle>
      <LabelText>{label}</LabelText>
    </Label>
  );
};

const Label = styled.View`
  flex-direction: ${props => props.direction || 'row'}
`;

const LabelText = styled.View`
  color: grey;
`;

const OuterCircle = styled.View`
  padding: 0;
  justify-content: center;
  align-items: center;
  border: 2px solid ${props => props.isSelected ? 'orange' : 'grey'};
  height: 18px;
  width: 18px;
  border-radius: 50%;
`;

const InnerCircle = styled.View`
  background-color: orange;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin: 1px;
  display: ${props => props.isSelected ? 'flex' : 'none'}
`;

export default RadioButtons;