import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from './socketcontext'
import { AuthProvider} from './providers/auth'

ReactDOM.render(
  <ContextProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ContextProvider>,
  document.getElementById('root')
);
