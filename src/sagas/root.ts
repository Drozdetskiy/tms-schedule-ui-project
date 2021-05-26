import { initSagas as initMessagesSaga } from './messages'
import { initSagas as initChatsSaga } from './chats'
import { initSagas as initCronTabsSaga } from './cronTabs'
import { initSagas as initTasksSaga } from './tasks'
import { all, fork } from 'redux-saga/effects'

export function* rootSaga():  Generator {
    yield all([initMessagesSaga, initChatsSaga, initCronTabsSaga, initTasksSaga].map(fork))
}
