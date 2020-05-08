// // @flow

// import React, { Component } from 'react';

// import InterestsComponent from '~/components/common/interests/Interests';
// import CONSTANTS from '~/utils/CONSTANTS';

// import firestore from '@react-native-firebase/firestore';

// type Props = {
//   navigation: Object,
// };

// class Interests extends Component<Props, {}> {
//   componentDidMount() {
//     const { navigation } = this.props;

//     navigation.setParams({
//       [CONSTANTS.PARAMS.HEADER_ACTION]: () =>
//         // TODO Replace here with asyn operation
//         setTimeout(() => {
//           navigation.navigate(CONSTANTS.ROUTES.MAIN_STACK);
//         }, 2000),
//     });
//   }

//   handleInterestSelect = value => {
//     console.log('INTEREST VALUES FROM CONTAINER', value);
//   };

//   render() {
//     return (
//       <InterestsComponent onHandleInterestSelect={this.handleInterestSelect} />
//     );
//   }
// }

// export default Interests;

// @flow

import React, { useEffect, useState, useCallback } from 'react';

import InterestsComponent from '~/components/common/interests/Interests';
import CONSTANTS from '~/utils/CONSTANTS';

// import firestore from '@react-native-firebase/firestore';

const Interests = props => {
  const { navigation } = props;
  // const [interests, setInterests] = useState();
  // const ref = firestore().collection('interests');

  // useEffect(() => {
  //   navigation.setParams({
  //     [CONSTANTS.PARAMS.HEADER_ACTION]: () =>
  //       // TODO Replace here with asyn operation
  //       navigateToMainStack(),
  //   });
  // }, [navigateToMainStack, navigation]);

  // const handleInterestSelect = value => {
  //   setInterests(value);
  // };

  // const addInterestToFirestore = useCallback(async () => {
  //   await ref.add(interests);
  // }, [interests, ref]);

  // const navigateToMainStack = useCallback(async () => {
  //   try {
  //     await addInterestToFirestore();
  //     navigation.navigate(CONSTANTS.ROUTES.MAIN_STACK);
  //   } catch (error) {}
  // }, [addInterestToFirestore, navigation]);

  return <InterestsComponent />;
};

export default Interests;
