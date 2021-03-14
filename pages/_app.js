// import App from 'next/app'

import App from 'next/app';
// import react from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from './../src/store/store';
import Head from 'next/head'
import './../src/css/style.css'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (

      <Provider store={store} >
                <Head >
                    <title> hellooooo </title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
               </Head>
          <Component {...pageProps} ></Component>


      </Provider>

    );
  }
}
const makestore = () => store;
const wapper = createWrapper(makestore)

export default wapper.withRedux(MyApp)
