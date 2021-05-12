import { AnyAction } from 'redux'
import { Message, PatchMessage } from '../types';


export enum MessageActions{
    SET_MESSAGES = 'SET_MESSAGES',
    SET_MESSAGE = 'SET_MESSAGE',
    ADD_MESSAGE = 'ADD_MESSAGE',
    CREATE_MESSAGE = 'CREATE_MESSAGE',
    PATCH_MESSAGE = 'PATCH_MESSAGE',
    DELETE_MESSAGE = 'DELETE_MESSAGE',
    FETCH_MESSAGES = 'FETCH_MESSAGES',
    FETCH_MESSAGE = 'FETCH_MESSAGE',
    UNSET_MESSAGE = 'UNSET_MESSAGE',
}

export const fetchMessages = ():AnyAction => ({
    type: MessageActions.FETCH_MESSAGES,
})

export const fetchMessage = (pk: number):AnyAction => ({
    type: MessageActions.FETCH_MESSAGE,
    payload: {pk}
})

export const setMessages = (data: Message[]):AnyAction => ({
    type: MessageActions.SET_MESSAGES,
    payload: {data}
})

export const setMessage = (data: Message):AnyAction => ({
    type: MessageActions.SET_MESSAGE,
    payload: {data}
})

export const addMessage = (data: PatchMessage):AnyAction => ({
    type: MessageActions.ADD_MESSAGE,
    payload: {data}
})

export const createMessage = (data: PatchMessage):AnyAction => ({
    type: MessageActions.CREATE_MESSAGE,
    payload: {data},
})

export const patchMessage = (pk: number, data: PatchMessage):AnyAction => ({
    type: MessageActions.PATCH_MESSAGE,
    payload: {pk, data}
})

export const deleteMessage = (pk: number):AnyAction => ({
    type: MessageActions.DELETE_MESSAGE,
    payload: {pk},
})

export const unsetMessage = (pk: number):AnyAction => ({
    type: MessageActions.UNSET_MESSAGE,
    payload: {pk}
})
