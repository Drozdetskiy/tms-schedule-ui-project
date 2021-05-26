import { AnyAction } from 'redux'
import { MessageActions } from '../actions/messages'
import { Message } from '../types';

export interface IMessagesReducer {
    messages: Message[]
}

const defaultState: IMessagesReducer = {
    messages: [],
}

export const messagesReducer = (
    state: IMessagesReducer = defaultState,
    action: AnyAction
): IMessagesReducer => {
    const { payload } = action

    switch (action.type) {
        case MessageActions.SET_MESSAGES:
            return { ...state, messages: payload.data }

        case MessageActions.SET_MESSAGE:
            return {
                ...state,
                messages: state.messages.map(
                    message => (message.pk === payload.data.pk) ?
                        { ...message, ...payload.data } : { ...message }
                )
            }

        case MessageActions.ADD_MESSAGE:
            return { ...state, messages: [ ...state.messages, payload.data ] }

        case MessageActions.UNSET_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(message => message.pk !== payload.pk)
            }
        default:
            return state
    }
}
