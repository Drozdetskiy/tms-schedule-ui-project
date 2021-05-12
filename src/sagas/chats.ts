import { call, put, takeLatest } from 'redux-saga/effects'
import { Chat } from '../types';
import { ChatActions, setChats, setChat, fetchChat, patchChat, deleteChat, unsetChat } from '../actions/chats';
import axios from '../utils/axios';
import { CHATS_ENDPOINT } from '../constants';


function* fetchChatsData() {
    const chats: Chat[] = yield call(axios.request, {
        url: CHATS_ENDPOINT,
        method: "get"
    });
    yield put(setChats(chats))
}

function* fetchChatData({ payload }: ReturnType<typeof fetchChat>) {
    const chat: Chat = yield call(axios.request, {
        url: `${CHATS_ENDPOINT}${payload.pk}/`,
        method: "get"
    });
    yield put(setChat(chat))
}

function* patchChatData({ payload }: ReturnType<typeof patchChat>) {
    const chat: Chat = yield call(axios.request, {
        url: `${CHATS_ENDPOINT}${payload.pk}/`,
        method: "patch",
        data: payload.data
    });
    yield put(setChat(chat))
}

function* deleteChatData({ payload }: ReturnType<typeof deleteChat>) {
    yield call(axios.request, {
        url: `${CHATS_ENDPOINT}${payload.pk}/`,
        method: "delete"
    });
    yield put(unsetChat(payload.pk))
}

export function* initSagas(): Generator {
    yield takeLatest(ChatActions.FETCH_CHATS, fetchChatsData);
    yield takeLatest(ChatActions.FETCH_CHAT, fetchChatData);
    yield takeLatest(ChatActions.PATCH_CHAT, patchChatData);
    yield takeLatest(ChatActions.DELETE_CHAT, deleteChatData);
}
