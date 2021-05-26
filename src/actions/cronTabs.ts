import { AnyAction } from 'redux'
import { CronTab, PatchCronTab } from '../types';


export enum CronTabsActions{
    SET_CRONTABS = 'SET_CRONTABS',
    SET_CRONTAB = 'SET_CRONTAB',
    ADD_CRONTAB = 'ADD_CRONTAB',
    CREATE_CRONTAB = 'CREATE_CRONTAB',
    PATCH_CRONTAB = 'PATCH_CRONTAB',
    DELETE_CRONTAB = 'DELETE_CRONTAB',
    FETCH_CRONTABS = 'FETCH_CRONTABS',
    FETCH_CRONTAB = 'FETCH_CRONTAB',
    UNSET_CRONTAB = 'UNSET_CRONTAB',
}

export const fetchCronTabs = ():AnyAction => ({
    type: CronTabsActions.FETCH_CRONTABS,
})

export const fetchCronTab = (pk: number):AnyAction => ({
    type: CronTabsActions.FETCH_CRONTAB,
    payload: {pk}
})

export const setCronTabs = (data: CronTab[]):AnyAction => ({
    type: CronTabsActions.SET_CRONTABS,
    payload: {data}
})

export const setCronTab = (data: CronTab):AnyAction => ({
    type: CronTabsActions.SET_CRONTAB,
    payload: {data}
})

export const addCronTab = (data: PatchCronTab):AnyAction => ({
    type: CronTabsActions.ADD_CRONTAB,
    payload: {data}
})

export const createCronTab = (data: PatchCronTab):AnyAction => ({
    type: CronTabsActions.CREATE_CRONTAB,
    payload: {data},
})

export const patchCronTab = (pk: number, data: PatchCronTab):AnyAction => ({
    type: CronTabsActions.PATCH_CRONTAB,
    payload: {pk, data}
})

export const deleteCronTab = (pk: number):AnyAction => ({
    type: CronTabsActions.DELETE_CRONTAB,
    payload: {pk},
})

export const unsetCronTab = (pk: number):AnyAction => ({
    type: CronTabsActions.UNSET_CRONTAB,
    payload: {pk}
})
