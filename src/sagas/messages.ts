import { call, put, takeLatest } from 'redux-saga/effects'
import { Message, PatchMessage } from '../types';
import {
    addMessage,
    createMessage, deleteMessage,
    fetchMessage,
    MessageActions,
    patchMessage,
    setMessage,
    setMessages, unsetMessage
} from '../actions/messages';
import axios from '../utils/axios';
import { MESSAGES_ENDPOINT } from '../constants';


function* fetchMessagesData() {
    const data: Message[] = yield call(axios.request, {
        url: MESSAGES_ENDPOINT,
        method: "get"
    });
    yield put(setMessages(data))
}

function* createMessageData({ payload }: ReturnType<typeof createMessage>) {
    const message: PatchMessage = yield call(axios.request, {
        url: MESSAGES_ENDPOINT,
        method: "post",
        data: payload.data
    });
    yield put(addMessage(message))
}

function* fetchMessageData({ payload }: ReturnType<typeof fetchMessage>) {
    const message: Message = yield call(axios.request, {
        url: `${MESSAGES_ENDPOINT}${payload.pk}/`,
        method: "get"
    });
    yield put(setMessage(message))
}

function* patchMessageData({ payload }: ReturnType<typeof patchMessage>) {
    const message: Message = yield call(axios.request, {
        url: `${MESSAGES_ENDPOINT}${payload.pk}/`,
        method: "patch",
        data: payload.data,
    });
    yield put(setMessage(message))
}

function* deleteMessageData({ payload }: ReturnType<typeof deleteMessage>) {
    yield call(axios.request, {
        url: `${MESSAGES_ENDPOINT}${payload.pk}/`,
        method: "delete",
    });
    yield put(unsetMessage(payload.pk))
}


export function* initSagas(): Generator {
    yield takeLatest(MessageActions.FETCH_MESSAGES, fetchMessagesData);
    yield takeLatest(MessageActions.CREATE_MESSAGE, createMessageData);
    yield takeLatest(MessageActions.FETCH_MESSAGE, fetchMessageData);
    yield takeLatest(MessageActions.PATCH_MESSAGE, patchMessageData);
    yield takeLatest(MessageActions.DELETE_MESSAGE, deleteMessageData);
}
