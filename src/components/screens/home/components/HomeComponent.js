// @flow

import React from 'react';
import { ScrollView, RefreshControl, View, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';

import TrendingAuthorsDiscover from './trending-authors/trending-authors-discover/TrendingAuthorsDiscover';
import NewReleasesDiscover from './new-releases/new-releases-discover/NewReleasesDiscover';
import HottestPodcasts from './hottest-podcasts/HottestPodcastsDiscover';
import BestPodcastsDiscover from './best-podcasts/best-podcasts-discover/BestPodcastsDiscover';

import ErrorMessage from '~/components/common/ErrorMessage';
import ScreenTitle from '~/components/common/ScreenTitle';
import Loading from '~/components/common/Loading';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';
import ExcludeRight from '~/components/common/ExcludeRight';
import ExcludeLeft from '~/components/common/ExcludeLeft';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const WrapperExclude = styled(View)`
  width: 100%;
  position: absolute;
  bottom: 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const ExcludeBar = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const Icon = styled(View)`
  width: 20px;
  height: 20px;
  background-color: #fff;
  width: 0;
  height: 0;
  border: 100px solid red;
`;
type Data = {
  trendingAuthors: Array<Object>,
  hottestPodcasts: Array<Object>,
  newReleases: Array<Object>,
};

type Props = {
  navigation: Object,
  getHome: Function,
  loading: boolean,
  error: boolean,
  data: Data,
};

const HomeComponent = ({
  navigation,
  loading,
  error,
  data,
  getHome,
}: Props): Object => {
  // console.log(data);
  return (
    <Wrapper>
      {loading && !error && <Loading />}
      {!loading && error && (
        <ErrorMessage
          message="Seems like you're having some troubles when trying to connect with the server."
          icon="server-network-off"
          title="Oops..."
        />
      )}
      {!loading && !error && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={appStyles.colors.primaryColor}
              tintColor={appStyles.colors.primaryColor}
              colors={[appStyles.colors.white]}
              refreshing={loading && !error}
              onRefresh={getHome}
            />
          }>
          <ScreenTitle title="Discover" />
          {data && data.length > 0 && (
            <BestPodcastsDiscover data={data} navigation={navigation} />
          )}
          {/* {data.newReleases && data.newReleases.length > 0 && (
          <NewReleasesDiscover
            data={data.newReleases}
            navigation={navigation}
          />
        )}
        {data.trendingAuthors && data.trendingAuthors.length > 0 && (
          <TrendingAuthorsDiscover
            data={data.trendingAuthors}
            navigation={navigation}
          />
        )}
        {data.hottestPodcasts && data.hottestPodcasts.length > 0 && (
          <HottestPodcasts
            data={data.hottestPodcasts}
            navigation={navigation}
          />
        )} */}
        </ScrollView>
      )}
      <WrapperExclude>
        <ExcludeBar>
          <ExcludeLeft />
          <ExcludeRight />
        </ExcludeBar>
      </WrapperExclude>
    </Wrapper>
  );
};

export default HomeComponent;
