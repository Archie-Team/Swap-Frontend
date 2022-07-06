import Header from "./Header";
import { Fragment } from 'react';

import "./PageLayout.css";

const PageLayout = (props) => {
    return (
        <Fragment>
          <Header />
          <main className='main'>{props.children}</main>
        </Fragment>
      );
};

export default PageLayout;
