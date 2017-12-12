import React from 'react';
import { NativeModules } from 'react-native';
import { Icon } from 'react-native-elements';

export default (props) => (
  <Icon
    raised
    name='book-open-page-variant'
    size={props.size ? props.size : 20}
    type='material-community'
    onPress={() => onDictionaryPress(props.english, props.noDefFound)}
    containerStyle={props.containerStyle}
  />
);

const onDictionaryPress = (term, noDefFound = null) => {
  NativeModules.ReferenceLibraryManager.showDefinitionForTerm(term, (hasDefinition) => {
    if (!hasDefinition && noDefFound) {
      noDefFound();
    }
  });
};
