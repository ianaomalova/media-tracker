import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
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
