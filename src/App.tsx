import React from 'react';
import {ThemeProvider} from '@/context/theme';
import GHRootView from '@/components/GHRootView';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GHRootView>
        <></>
      </GHRootView>
    </ThemeProvider>
  );
};

export default App;
