import { AnyAction } from 'redux'
import { Chat, PatchChat } from '../types';

export enum ChatActions {
    SET_CHATS = 'SET_CHATS',
    SET_CHAT = 'SET_CHAT',
    PATCH_CHAT = 'PATCH_CHAT',
    DELETE_CHAT = 'DELETE_CHAT',
    FETCH_CHATS = 'FETCH_CHATS',
    FETCH_CHAT = 'FETCH_CHAT',
    UNSET_CHAT = 'UNSET_CHAT',
}

export const fetchChats = (): AnyAction => ({
    type: ChatActions.FETCH_CHATS,
})

export const fetchChat = (pk: number): AnyAction => ({
    type: ChatActions.FETCH_CHAT,
    payload: {pk}
})

export const setChats = (data: Chat[]): AnyAction => ({
    type: ChatActions.SET_CHATS,
    payload: {data},
})

export const setChat = (data: Chat): AnyAction => ({
    type: ChatActions.SET_CHAT,
    payload: {data},
})

export const patchChat = (pk: number, data: PatchChat): AnyAction => ({
    type: ChatActions.PATCH_CHAT,
    payload: {pk, data},
})

export const deleteChat = (pk: number): AnyAction => ({
    type: ChatActions.DELETE_CHAT,
    payload: {pk},
})

export const unsetChat = (pk: number): AnyAction => ({
    type: ChatActions.UNSET_CHAT,
    payload: {pk},
})
