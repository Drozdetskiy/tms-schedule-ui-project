import { combineReducers } from 'redux'
import { IMessagesReducer, messagesReducer } from './messages';
import { chatsReducer, IChatsReducer } from './chats';
import { cronTabsReducer, ICronTabsReducer } from './cronTabs';
import { ITasksReducer, tasksReducer } from './tasks';


export interface IRootState {
    messages: IMessagesReducer,
    chats: IChatsReducer,
    cronTabs: ICronTabsReducer,
    tasks: ITasksReducer,
}

export const rootReducer = combineReducers<IRootState>({
    messages: messagesReducer,
    chats: chatsReducer,
    cronTabs: cronTabsReducer,
    tasks: tasksReducer,
})
