import { call, put, takeLatest } from 'redux-saga/effects'
import { CronTab, PatchCronTab } from '../types';
import axios from '../utils/axios';
import {
    addCronTab,
    createCronTab,
    CronTabsActions,
    deleteCronTab,
    fetchCronTab,
    fetchCronTabs,
    patchCronTab,
    setCronTab,
    setCronTabs, unsetCronTab
} from '../actions/cronTabs';
import { CRONTABS_ENDPOINT } from '../constants';

function* fetchCronTabsData() {
    const data: CronTab[] = yield call(axios.request, {
        url: CRONTABS_ENDPOINT,
        method: "get"
    });
    yield put(setCronTabs(data))
}

function* createCronTabData({ payload }: ReturnType<typeof createCronTab>) {
    const cronTab: PatchCronTab = yield call(axios.request, {
        url: CRONTABS_ENDPOINT,
        method: "post",
        data: payload.data
    });
    yield put(addCronTab(cronTab))
}

function* fetchCronTabData({ payload }: ReturnType<typeof fetchCronTab>) {
    const cronTab: CronTab = yield call(axios.request, {
        url: `${CRONTABS_ENDPOINT}${payload.pk}/`,
        method: "get"
    });
    yield put(setCronTab(cronTab))
}

function* patchCronTabData({ payload }: ReturnType<typeof patchCronTab>) {
    const cronTab: CronTab = yield call(axios.request, {
        url: `${CRONTABS_ENDPOINT}${payload.pk}/`,
        method: "patch",
        data: payload.data,
    });
    yield put(setCronTab(cronTab))
}

function* deleteCronTabData({ payload }: ReturnType<typeof deleteCronTab>) {
    yield call(axios.request, {
        url: `${CRONTABS_ENDPOINT}${payload.pk}/`,
        method: "delete",
    });
    yield put(unsetCronTab(payload.pk))
}


export function* initSagas(): Generator {
    yield takeLatest(CronTabsActions.FETCH_CRONTABS, fetchCronTabsData);
    yield takeLatest(CronTabsActions.CREATE_CRONTAB, createCronTabData);
    yield takeLatest(CronTabsActions.FETCH_CRONTAB, fetchCronTabData);
    yield takeLatest(CronTabsActions.PATCH_CRONTAB, patchCronTabData);
    yield takeLatest(CronTabsActions.DELETE_CRONTAB, deleteCronTabData);
}
