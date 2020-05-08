// @flow

import React from 'react';
import { Platform, View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '~/components/common/Icon';
import SNIPPTLeft from '../../../common/logos/SNIPPTLeft';
import SNIPTTRight from '../../../common/logos/SNIPTTRight';
import Onboarding from '../../../common/logos/Onboarding';
import { ThemeConsumer } from 'styled-components';

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

const OnboardingLogoWrapper = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const CentralLogo = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;

  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('25%')}px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
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
  margin-bottom: 200px;
  margin-left: 30px;
  margin-right: 30px;
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
    centralLogo: true,
  },
];

type Props = {
  currentIndex: number,
};

const MiddleContent = ({ currentIndex }: Props): Object => {
  const { title, description, logo, icon, stylesTemp, centralLogo } = ITEMS[
    currentIndex
  ];

  const getLogo = () => {
    if (logo === 'SNIPPTLeft') {
      return (
        <ThemeConsumer>
          {(theme) => (
            <LogoWrapper alignment="left">
              <SNIPPTLeft fill={theme.colors.textColor} />
            </LogoWrapper>
          )}
        </ThemeConsumer>
      );
    } else {
      return (
        <ThemeConsumer>
          {(theme) => (
            <LogoWrapper alignment="right">
              <SNIPTTRight fill={theme.colors.textColor} />
            </LogoWrapper>
          )}
        </ThemeConsumer>
      );
    }
  };

  return (
    <Wrapper>
      {getLogo()}
      {/* {centralLogo && (
        <IconWrapper>
          <CentralLogo />
        </IconWrapper>
      )} */}
      {!icon && (
        <OnboardingLogoWrapper>
          <ThemeConsumer>
            {(theme) => <Onboarding fill={theme.colors.textColor} />}
          </ThemeConsumer>
        </OnboardingLogoWrapper>
      )}
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
