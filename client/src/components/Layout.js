import React from 'react';
import Header from './navigation/Header';

export default function Layout(props) {
    return (
        <div>
            <Header/>
            {props.children} 
        </div>
    )
}
