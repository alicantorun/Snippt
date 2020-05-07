// @flow

import React, { Fragment } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import DefaultText from '../../login/components/DefaultText';
import appStyles from '~/styles';

const DotsWrapper = styled(View)`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const PaginationDot = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('0.5%')}px;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primaryColor : theme.colors.subTextWhite};
`;

const ButtonsWrapper = styled(View)`
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const GetStartedButton = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('8%')}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  border-radius: 12px;
  border-top-right-radius: 4px;
`;

const Button = styled(TouchableOpacity)`
  width: 35%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const renderControlButtons = ({
  onPressPrevious,
  currentIndex,
  onPressNext,
  onPressSkip,
  pagesLength,
}): Object => {
  return (
    <ButtonsWrapper>
      <DotsWrapper>
        {Array(pagesLength)
          .fill({})
          .map((_, index) => (
            <PaginationDot
              isSelected={index === currentIndex}
              key={`DOT${index - 1}`}>
              {'\u2022'}
            </PaginationDot>
          ))}
      </DotsWrapper>
    </ButtonsWrapper>
  );
};

const renderGetStartedButton = (onPressSkip: Function): Object => (
  <ButtonsWrapper>
    <GetStartedButton onPress={onPressSkip}>
      <DefaultText color={appStyles.colors.white} text="GET STARTED" />
    </GetStartedButton>
  </ButtonsWrapper>
);

type Props = {
  onPressPrevious: Function,
  onPressNext: Function,
  onPressSkip: Function,
  currentIndex: number,
  pagesLength: number,
};

const BottomContent = (props: Props): Object => {
  const { onPressSkip, currentIndex, pagesLength } = props;

  return (
    <Fragment>
      {currentIndex === pagesLength - 1 ? (
        <>
          {renderGetStartedButton(onPressSkip)}
          {renderControlButtons({ ...props })}
        </>
      ) : (
        renderControlButtons({ ...props })
      )}
    </Fragment>
  );
};

export default BottomContent;
