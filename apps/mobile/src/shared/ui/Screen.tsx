import type { ReactNode } from 'react';
import { SafeAreaView, type Edges } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
  edges?: Edges;
}

export default function Screen({ children, edges }: Props) {
  return (
    <SafeAreaView
      edges={edges}
      style={{
        flex: 1,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
