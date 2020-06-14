import React, { Fragment } from 'react';

import classes from './Layout.module.scss';

const Layout = props => {
    return <Fragment>
                <main>
                    {props.children}
                </main>               
           </Fragment>
}

export default Layout;