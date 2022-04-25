import React from 'react';
import Paper from './components/Paper.component';
import MainLayout from './layouts/MainLayout.component';
import Resume from './modules/Resume/ResumeContent.component';

function App() {
  return (
    <MainLayout>
      <Paper>
        <Resume />
      </Paper>
    </MainLayout>
  );
}

export default App;
