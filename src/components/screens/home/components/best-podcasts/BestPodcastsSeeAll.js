// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import { setHeaderPlayButtonPress } from '~/routes/utils/navigationOptions';
import BestPodcastsSeeAllListItem from '~/components/common/PodcastItemLIst';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const BestPodcastsSeeAllList = styled(FlatList)`
  width: 100%;
  height: 100%;
`;

type Props = {
  data: Array<Object>,
  navigation: Object,
};

class BestPodcastsSeeAll extends Component<Props, {}> {
  componentDidMount() {
    const bestPodcasts = this.getBestPodcasts();
    const { navigation } = this.props;

    setHeaderPlayButtonPress(bestPodcasts, navigation);
  }

  getBestPodcasts = (): Array<Object> => {
    const { navigation } = this.props;
    const { params } = navigation.state;

    return params[CONSTANTS.PARAMS.PODCASTS_NEW_RELEASES];
  };

  render() {
    const { navigation } = this.props;

    const bestPodcasts = this.getBestPodcasts();

    return (
      <Wrapper>
        <BestPodcastsSeeAllList
          keyExtractor={podcast => `${podcast.id}`}
          showsVerticalScrollIndicator={false}
          data={bestPodcasts}
          renderItem={({ item, index }) => (
            <BestPodcastsSeeAllListItem
              onPressItem={() =>
                navigation.navigate(CONSTANTS.ROUTES.PODCAST_DETAIL, {
                  [CONSTANTS.KEYS
                    .PODCAST_DETAIL_SHOULD_SHOW_AUTHOR_SECTION]: true,
                  [CONSTANTS.PARAMS.PODCAST_DETAIL]: item,
                })
              }
              shouldShowDownloadStatus={false}
              index={index + 1}
              podcast={item}
            />
          )}
        />
      </Wrapper>
    );
  }
}

export default BestPodcastsSeeAll;
