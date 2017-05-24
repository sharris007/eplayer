// We only need to import the modules necessary for initial render
import { CoreLayout } from '../layouts/CoreLayout/CoreLayout';
import loginRoute from './Login';
import bookshelfRoute from './Bookshelf';
import bookRoute from './Book';
import ETbookshelfRoute from './ETBookshelf';
import ETbookRoute from './ETBook';
import pdfbookRoute from './PdfBook';
import Print from './Print';
import multiTaskPanel from './MultiTaskPanel';
import Course from './Course';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = store => ({
  path: '/eplayer',
  component: CoreLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/eplayer/login') },
  childRoutes: [
    loginRoute(store),
    bookshelfRoute(store),
    bookRoute(store),
    pdfbookRoute(store),
    ETbookshelfRoute(store),
    ETbookRoute(store),
    Print(store),
    multiTaskPanel(store), 
    Course(store)
  ]
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;
