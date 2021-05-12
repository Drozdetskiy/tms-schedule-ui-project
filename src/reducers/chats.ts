import { AnyAction } from 'redux'
import { ChatActions } from '../actions/chats'
import { Chat } from '../types';

export interface IChatsReducer {
    chats: Chat[]
}

const defaultState: IChatsReducer = {
    chats: [],
}

export const chatsReducer = (
    state: IChatsReducer = defaultState,
    action: AnyAction
): IChatsReducer => {
    const {payload} = action

    switch (action.type) {
        case ChatActions.SET_CHATS:
            return {
                ...state,
                chats: payload.data
            }

        case ChatActions.SET_CHAT:
            return {
                ...state,
                chats: state.chats.map(
                    chat => (chat.pk === payload.data.pk) ?
                        {...chat, ...payload.data} : {...chat}
                )
            }

        case ChatActions.UNSET_CHAT:
            return {
                ...state,
                chats: state.chats.filter(chat => chat.pk !== payload.pk)
            }

        default:
            return state
    }
}
