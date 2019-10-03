import React from 'react';
import { ChatkitProvider, TokenProvider } from '@pusher/chatkit-client-react';
import './App.css';
import Chat from './Chat';
import UserList from './UserList';
import Login from './Login';
import chatkitLogo from './chatkit-logo.svg';

// unique string that helps clients find my Chatkit instance
const instanceLocator = 'v1:us1:fdfa12ec-461d-4196-abbb-59f5288d2813';

// Adding Token Provider for testing purposes
const tokenProvider = new TokenProvider({
  url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/fdfa12ec-461d-4196-abbb-59f5288d2813/token',
});

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId'); // ID of the user you would like to connect as
  const otherUserId = urlParams.get('otherUserId');

  return (
    <div className="App">
      {userId && otherUserId ? (
        <>
          <div className="App__chatwindow">
          <ChatkitProvider
              instanceLocator={instanceLocator}
              tokenProvider={tokenProvider}
              userId={userId}
            >
              <UserList userId={userId}/>
              {/* pass in ID of the user you would like to talk to */}
              <Chat otherUserId={otherUserId} /> 
            </ChatkitProvider>
          </div>
        </>
      ) : (
        <Login />
      )}
      <div className="App__backdrop">
        <img
          className="App__backdrop__logo"
          src={chatkitLogo}
          alt="Chatkit logo"
        />
      </div>
    </div>
  );
}

export default App;
