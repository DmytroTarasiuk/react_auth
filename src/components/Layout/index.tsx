import React, { Fragment } from 'react';

import Header from '../Header/Header';
import classes from './Layout.module.css'
import Menu from '../Menu/Menu';
import Orders from '../Orders/Orders';


const Layout: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <main className={classes.main}>
        <Menu />
        <Orders />
      </main>
    </Fragment>
  );
};

export default Layout;