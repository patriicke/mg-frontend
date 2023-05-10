import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

// import { Web3Provider } from '@ethersproject/providers';
// import { Web3ReactProvider } from '@web3-react/core';
// import { MetamaskContextProvider } from '../hooks&contexts/useMetamask';
// import { PhantomContext } from '../hooks&contexts/PhantomContext';
// import { LoadingContextProvider } from '../hooks&contexts/useLoading';

import { store } from '../store';
import { DialogContextProvider } from '../hooks/useDialog';
// require('@solana/wallet-adapter-react-ui/styles.css');

// const CLIENT_ID =
//   '293355778714-4s02vn1v9a8de7l1j3f2bijmeo5na8pn.apps.googleusercontent.com';

// const getLibrary = (provider: any, connector: any) => {
//   const web3Provider = new Web3Provider(provider);
//   return web3Provider;
// };

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <DialogContextProvider>{children}</DialogContextProvider>
    </Provider>
  );

  // return (
  //   <Provider store={store}>
  //     <LoadingContextProvider>
  //       <GoogleOAuthProvider clientId={CLIENT_ID}>
  //         <Web3ReactProvider getLibrary={getLibrary}>
  //           <MetamaskContextProvider>
  //             <PhantomContext>
  //               <DialogContextProvider>{children}</DialogContextProvider>
  //             </PhantomContext>
  //           </MetamaskContextProvider>
  //         </Web3ReactProvider>
  //       </GoogleOAuthProvider>
  //     </LoadingContextProvider>
  //   </Provider>
  // );
};

export default Providers;
