import React from "react";
import styled from "styled-components/native";

const RadioButtons = props => (
  <RadioButtonsContainer>
    {props.btns.map(btnProps => (
      <RadioButton
        key={btnProps.id}
        isSelected={props.selected === btnProps.id}
        selectRadioButton={props.selectRadioButton}
        {...btnProps}
      />
    ))}
  </RadioButtonsContainer>
);

const RadioButton = ({
  id,
  isSelected,
  label,
  selectRadioButton,
  btnLabelDirection
}) => {
  const selectThisRadioButton = selectRadioButton(id);
  return (
    <Label direction={btnLabelDirection} onPress={selectThisRadioButton}>
      <OuterCircle isSelected={isSelected}>
        <InnerCircle isSelected={isSelected} />
      </OuterCircle>
      <LabelText>{label}</LabelText>
    </Label>
  );
};

const RadioButtonsContainer = styled.View`
  flex-direction: ${props => props.btnGroupDirection || "row"};
`;

const Label = styled.TouchableOpacity`
  flex-direction: ${props => props.direction || "row"};
`;

const LabelText = styled.Text`
  color: grey;
  margin-left: 10px;
  margin-right: 10px;
`;

const OuterCircle = styled.View`
  padding: 0;
  justify-content: center;
  align-items: center;
  border: 2px solid ${props => (props.isSelected ? "#fa9600" : "grey")};
  height: 18px;
  width: 18px;
  border-radius: 9px;
`;

const InnerCircle = styled.View`
  background-color: #fa9600;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  margin: 1px;
  display: ${props => (props.isSelected ? "flex" : "none")};
`;

export default RadioButtons;
