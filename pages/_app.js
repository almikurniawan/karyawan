import '../styles/globals.css'
import 'antd/dist/antd.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

import Framework7 from "framework7/lite-bundle";
// Import Framework7-React and components
import Framework7React, { App, View } from "framework7-react";
// Next router
import { useRouter } from "next/router";

// Import icons and styles
import "framework7/framework7-bundle.css";
import "framework7-icons/css/framework7-icons.css";
import "material-icons/iconfont/material-icons.css";
// import "../styles/globals.css";

// Install Framework7 React plugin for Framework7
Framework7.use(Framework7React);

// App routes
const routes = [
  {
    path: '/',
    asyncComponent: () => import('./index'),
  },
];

function MyApp({ Component, pageProps }) {
  // current Next.js route
  const router = useRouter();
  /*
    Here we need to know (mostly on server-side) on what URL user opens our app
  */
  const url = `${process.env.NEXT_PUBLIC_HOST}${router.asPath}`;

  return (
    /*
      Here we pass initial server URL and routes to the Framework7's App.
      It is required because Framework7 will be initialized on server-side,
      and we need to know this URL to correctly load pages by Framework7 router
    */
    <App url={url} routes={routes}>
      {/*
        Create main View.
        Apparently we need to enable browserHistory to navigating by URL
      */}
      <View
        main
        browserHistory
        browserHistorySeparator=""
        browserHistoryInitialMatch={true}
        browserHistoryStoreHistory={false}
        url="/"
      >
        {/*
          Initial page components (returned by Next.js).
          Here it is mandatory to set `initialPage` prop on it.
        */}
        <Component initialPage {...pageProps} />
      </View>
    </App>
  );
}


export default MyApp
