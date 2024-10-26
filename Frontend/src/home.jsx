import React from 'react';
import withAuth from './contexts/withAuth';
function Home() {
    return ( <h1>Home</h1> );
}

export default withAuth(Home);