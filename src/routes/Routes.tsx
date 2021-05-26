import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MessageListContainer from '../containers/MessageListContainer';
import ChatListContainer from "../containers/ChatListContainer";
import TaskListContainer from '../containers/TaskListContainer';
import CronTabListContainer from '../containers/CronTabListContainer';
import SignInContainer from '../containers/SignInContainer';


export const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact={true} component={MessageListContainer}/>
        <Route path="/chats" exact={true} component={ChatListContainer}/>
        <Route path="/crontabs" exact={true} component={CronTabListContainer}/>
        <Route path="/tasks" exact={true} component={TaskListContainer}/>
        <Route path="/signIn" exact={true} component={SignInContainer}/>
    </Switch>
);
