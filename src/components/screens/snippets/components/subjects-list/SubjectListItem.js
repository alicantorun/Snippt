// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

const Container = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('100%')}px;
  
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;

  /*
  margin-right: ${({ theme, index }) =>
    index % 2 !== 0 ? theme.metrics.largeSize : 0}px;
  margin-left: ${({ theme, index }) =>
    index % 2 === 0 ? 0 : theme.metrics.largeSize}px;
  border-radius: 4px;
  */
`;

const SubjectImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri, priority: FastImage.priority.high },
}))`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 4px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const Title = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  isTextInputFocused: boolean,
  onPress: Function,
  imageURL: string,
  title: string,
  index: number,
};

const SubjectListItem = ({
  isTextInputFocused,
  imageURL,
  onPress,
  podcastTitle,
  episodeTitle,
  snippetText,
  thumbnail,
  title,
  index,
}: Props): Object => {
  console.log('SNIPPET THUMBNAIL:', thumbnail);
  return (
    <Container disabled={isTextInputFocused} onPress={onPress} index={index}>
      {/* <View>
      <Text>{podcastTitle}</Text>
      <Text>{episodeTitle}</Text>
      <Text>{snippetText}</Text>
      <SubjectImage uri={imageURL} />
    </View> */}

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View
          style={{
            width: 64,
            height: 64,
            marginRight: 12,
          }}>
          <SubjectImage uri={thumbnail} />
        </View>
        <View
          style={{
            flex: 1,
            height: 50,
            // alignContent: 'stretch',
            // alignItems: 'stretch',
          }}>
          <Title
            style={{
              fontWeight: 'bold',
            }}>
            {podcastTitle}
          </Title>
          <Title>{episodeTitle}</Title>
          <Title>{snippetText}</Title>
        </View>
      </View>
    </Container>
  );
};

export default SubjectListItem;
