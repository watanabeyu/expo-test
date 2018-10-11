import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const Inner1 = props => (
  <Button onPress={() => props.navigation.navigate('inner2')} title="Inner2" />
);
const Inner2 = props => (
  <View>
    <Button
      onPress={() => {
        props.navigation.pop();
        props.navigation.navigate('outer2');
      }}
      title="Outer2 no delay"
    />
    <Button
      onPress={() => {
        const listener = props.navigation.addListener('didBlur', () => {
          props.navigation.navigate('outer2');
          listener.remove();
        });
        props.navigation.pop();
      }}
      title="Outer2 with delay"
    />
  </View>
);

const Outer1 = createStackNavigator({
  inner1: { screen: Inner1, navigationOptions: { title: 'Inner1' } },
  inner2: { screen: Inner2, navigationOptions: { title: 'Inner2' } },
});
const Outer2 = () => <Text>This is where we should end up</Text>;

const App = createStackNavigator({
  outer1: { screen: Outer1, navigationOptions: { title: 'Outer1' } },
  outer2: { screen: Outer2, navigationOptions: { title: 'Outer2' } },
});

export default App;
