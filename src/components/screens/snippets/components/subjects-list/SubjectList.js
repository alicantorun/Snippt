// @flow

import React from 'react';
import { FlatList } from 'react-native';

import SubjectsListItem from './SubjectListItem';
import CONSTANTS from '~/utils/CONSTANTS';

const items = [
  {
    id: 'technology',
    podcastTitle: 'TECHNOLOGY',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/technology/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/technology/thumbnail.jpg',
  },
  {
    id: 'philosofy',
    podcastTitle: 'PHILOSOFY',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/philosofy/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/philosofy/thumbnail.jpg',
  },
  {
    id: 'business',
    podcastTitle: 'BUSINESS',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/business/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/business/thumbnail.jpg',
  },
  {
    id: 'science',
    podcastTitle: 'SCIENCE',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/science/big.jpeg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/science/thumbnail.jpg',
  },
  {
    id: 'pop-culture',
    podcastTitle: 'POP CULTURE',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/pop-culture/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/pop-culture/thumbnail.jpg',
  },
  {
    id: 'history',
    podcastTitle: 'HISTORY',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/history/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/history/thumbnail.jpg',
  },
  {
    id: 'technology',
    podcastTitle: 'TECHNOLOGY',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/technology/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/technology/thumbnail.jpg',
  },
  {
    id: 'philosofy',
    podcastTitle: 'PHILOSOFY',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/philosofy/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/philosofy/thumbnail.jpg',
  },
  {
    id: 'business',
    podcastTitle: 'BUSINESS',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/business/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/business/thumbnail.jpg',
  },
  {
    id: 'science',
    podcastTitle: 'SCIENCE',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/science/big.jpeg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/science/thumbnail.jpg',
  },
  {
    id: 'pop-culture',
    podcastTitle: 'POP CULTURE',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/pop-culture/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/pop-culture/thumbnail.jpg',
  },
  {
    id: 'history',
    podcastTitle: 'HISTORY',
    episodeTitle: 'episode title',
    snippetText: '14:53',
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/history/big.jpg',
    thumbnailImageURL:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/history/thumbnail.jpg',
  },
];

type Props = {
  isTextInputFocused: boolean,
  navigation: Object,
};

const SubjectsList = ({
  isTextInputFocused,
  navigation,
  snippets,
}: Props): Object => {
  console.log('SNIPPETS: ', snippets);
  return (
    <FlatList
      renderItem={({ item, index }) => {
        console.log('snippet item: ', item);
        return (
          <SubjectsListItem
            onPress={() => {
              navigation.navigate(CONSTANTS.ROUTES.SUBJECT_DETAIL, {
                [CONSTANTS.PARAMS.SUBJECT_DETAIL]: item,
              });
            }}
            isTextInputFocused={isTextInputFocused}
            imageURL={item.imageURL}
            podcastTitle={item.podcastTitle}
            episodeTitle={item.episodeTitle}
            snippetText={item.snippetText}
            title={item.title}
            index={index}
          />
        );
      }}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => `${item.id}`}
      numColumns={1}
      data={snippets}
    />
  );
};

export default SubjectsList;
