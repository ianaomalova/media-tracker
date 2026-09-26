import { StyleSheet, View, Text } from 'react-native';

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
