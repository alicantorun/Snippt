// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from '~/utils/isEqualsOrLargestThanIphoneX';
import NavigationBarItem from './NavigationBarItem';

import ExcludeRight from '~/components/common/ExcludeRight';
import ExcludeLeft from '~/components/common/ExcludeLeft';
import { ThemeConsumer } from 'styled-components';

const WrapperExclude = styled(View)`
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-bottom: 104px;
  margin-left: 17px;
  border-bottom-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const ExcludeBar = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const Wrapper = styled(View).attrs(({ theme }) => ({
  borderTopColor: theme.colors.secondaryColor,
}))`
  width: 100%;
  height: ${({ theme }) =>
    theme.metrics.getWidthFromDP('18%') +
    (isEqualsOrLargestThanIphoneX() ? 30 : 0)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding-bottom: ${isEqualsOrLargestThanIphoneX() ? 30 : 0}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

type Props = {
  onSelectStackRoute: Function,
  stackRouteSelected: number,
  items: Array<Object>,
};

const NavigationBar = ({
  onSelectStackRoute,
  stackRouteSelected,
  items,
}: Props): Object => (
  <Wrapper>
    {items.map((item, index) => (
      <NavigationBarItem
        {...item}
        onPressItem={() => onSelectStackRoute(item.route)}
        isSelected={stackRouteSelected === index}
        key={item.label}
      />
    ))}
    <ThemeConsumer>
      {(theme) => (
        <WrapperExclude>
          <ExcludeBar>
            <ExcludeLeft fill={theme.colors.backgroundColor} />
            <ExcludeRight fill={theme.colors.backgroundColor} />
          </ExcludeBar>
        </WrapperExclude>
      )}
    </ThemeConsumer>
  </Wrapper>
);
export default NavigationBar;
