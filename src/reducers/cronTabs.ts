import { AnyAction } from 'redux'
import { CronTabsActions } from '../actions/cronTabs'
import { CronTab } from '../types';

export interface ICronTabsReducer {
    cronTabs: CronTab[]
}

const defaultState: ICronTabsReducer = {
    cronTabs: [],
}

export const cronTabsReducer = (
    state: ICronTabsReducer = defaultState,
    action: AnyAction
): ICronTabsReducer => {
    const {payload} = action

    switch (action.type) {
        case CronTabsActions.SET_CRONTABS:
            return {
                ...state,
                cronTabs: payload.data
            }

        case CronTabsActions.SET_CRONTAB:
            return {
                ...state,
                cronTabs: state.cronTabs.map(
                    cronTab => (cronTab.pk === payload.data.pk) ?
                        {...cronTab, ...payload.data} : {...cronTab}
                )
            }
        case CronTabsActions.ADD_CRONTAB:
            return { ...state, cronTabs: [ ...state.cronTabs, payload.data ] }

        case CronTabsActions.UNSET_CRONTAB:
            return {
                ...state,
                cronTabs: state.cronTabs.filter(cronTab => cronTab.pk !== payload.pk)
            }

        default:
            return state
    }
}
