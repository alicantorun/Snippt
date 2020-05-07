// @flow

import React from 'react';
import { Platform, View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import SNIPPTLeft from '../../../common/logos/SNIPPTLeft';
import SNIPTTRight from '../../../common/logos/SNIPTTRight';

import appStyles from '~/styles';

const Wrapper = styled(View)`
  flex: 1;
`;

const LogoWrapper = styled(View)`
  flex: 1;
  margin-top: ${({ alignment }) => (alignment === 'left' ? '0px' : '8px')};
  align-items: ${({ alignment }) =>
    alignment === 'left' ? 'flex-end' : 'flex-start'};
`;

const Description = styled(Text)`
  font-size: ${({ theme }) => 1.2 * theme.metrics.largeSize}px;
  color: ${({ stylesTemp, theme }) =>
    stylesTemp.color === 'primaryColor'
      ? theme.colors.primaryColor
      : theme.colors.textColor};
  font-family: CircularStd-Medium;
`;

const DescriptionWrapper = styled(View)`
  flex: 1;
  align-items: flex-start;
  justify-content: ${({ stylesTemp }) => stylesTemp.descriptionAlignment};
  margin-bottom: 60px;
  margin-left: 30px;
  margin-top: 100px;
`;

const ITEMS = [
  {
    description: 'Podcast App',
    icon: 'podcast',
    logo: 'SNIPPTLeft',
    stylesTemp: {
      descriptionAlignment: 'center',
      color: 'primaryColor',
    },
  },
  {
    description:
      'Stream the globe’s podcasts and save snppts of your favorite podcast into your own library.',
    logo: 'SNIPPTRight',
    stylesTemp: {
      descriptionAlignment: 'flex-start',
      color: 'textColor',
    },
  },
];

type Props = {
  currentIndex: number,
};

const MiddleContent = ({ currentIndex }: Props): Object => {
  const { title, description, logo, icon, stylesTemp } = ITEMS[currentIndex];

  const getLogo = () => {
    if (logo === 'SNIPPTLeft') {
      return (
        <LogoWrapper alignment="left">
          <SNIPPTLeft />
        </LogoWrapper>
      );
    } else {
      return (
        <LogoWrapper alignment="right">
          <SNIPTTRight />
        </LogoWrapper>
      );
    }
  };

  return (
    <Wrapper>
      {getLogo()}
      <DescriptionWrapper stylesTemp={stylesTemp}>
        <Description stylesTemp={stylesTemp}>
          {icon && (
            <Icon color={appStyles.colors.primaryColor} name={icon} size={30} />
          )}
          {description}
        </Description>
      </DescriptionWrapper>
    </Wrapper>
  );
};

export default MiddleContent;
