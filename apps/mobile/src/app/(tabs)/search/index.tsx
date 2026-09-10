import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  return (
    <>
      <Stack.Title>Search</Stack.Title>

      <Stack.SearchBar
        placement="automatic"
        placeholder="Search media"
        onChangeText={(event) => {
          setQuery(event.nativeEvent.text);
        }}
      />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Query: {query}</Text>
      </ScrollView>
    </>
  );
}
