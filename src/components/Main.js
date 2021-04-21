import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Schedule from './Schedule'
import Room from './Room'



// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Schedule}/>
            <Route exact path='/Schedule' component={Schedule}/>
            <Route exact path='/Room' component={Room}/>
        </Switch>
    </main>
);

export default Main