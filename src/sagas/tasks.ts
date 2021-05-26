import { call, put, takeLatest } from 'redux-saga/effects'
import { Task, Message, Chat, CronTab, BETask } from '../types';
import axios from '../utils/axios';
import {
    addTask,
    createTask,
    deleteTask,
    fetchTask,
    patchTask,
    setTask,
    setTasks,
    TaskActions,
    unsetTask
} from '../actions/tasks';
import { CHATS_ENDPOINT, CRONTABS_ENDPOINT, MESSAGES_ENDPOINT, TASK_FILTER, TASKS_ENDPOINT } from '../constants';
import { setMessages } from '../actions/messages';
import { setCronTabs } from '../actions/cronTabs';
import { setChats } from '../actions/chats';


type MessageDict = {
    [pk: number]: Message
}

type ChatDict = {
    [pk: number]: Chat
}

type CronTabDict = {
    [pk: number]: CronTab
}

function* fetchTasksData() {
    const tasksList: BETask[] = yield call(axios.request, {
        url: TASKS_ENDPOINT,
        method: "get"
    });
    const messagesList: Message[] = yield call(axios.request, {
        url: MESSAGES_ENDPOINT,
        method: "get"
    });
    const chatsList: Chat[] = yield call(axios.request, {
        url: CHATS_ENDPOINT,
        method: "get"
    });
    const cronTabsList: CronTab[] = yield call(axios.request, {
        url: CRONTABS_ENDPOINT,
        method: "get"
    });

    const messages = messagesList.reduce(
        (acc: MessageDict, message: Message) => {
            acc[message.pk] = message;
            return acc
        }, {}
    )
    const chats = chatsList.reduce(
        (acc: ChatDict, chat) => {
            acc[chat.pk] = chat;
            return acc
        }, {}
    )
    const cronTabs = cronTabsList.reduce(
        (acc: CronTabDict, cronTab) => {
            acc[cronTab.pk] = cronTab;
            return acc
        }, {}
    )
    const data = tasksList.filter((task => task.name !== TASK_FILTER)).reduce(
        (acc: Array<Task>, task) => {
            const args: Array<number> = JSON.parse(task.args)
            const chat_id = args[0]
            const message_id = args[1]
            return [...acc, {
                pk: task.pk,
                name: task.name,
                chat: chats[chat_id],
                cronTab: cronTabs[task.crontab_id],
                message: messages[message_id],
                chat_id: chat_id,
                message_id: message_id,
                crontab_id: task.crontab_id,
            }]
        }, []
    )
    yield put(setChats(chatsList))
    yield put(setMessages(messagesList))
    yield put(setCronTabs(cronTabsList))
    yield put(setTasks(data))
}

function* createTaskData({payload}: ReturnType<typeof createTask>) {
    const task: BETask = yield call(axios.request, {
        url: TASKS_ENDPOINT,
        method: "post",
        data: payload.data
    });

    const [chat_id, message_id] = JSON.parse(task.args)

    const message: Message = yield call(axios.request, {
        url: `${MESSAGES_ENDPOINT}${message_id}/`,
        method: "get"
    });
    const chat: Chat = yield call(axios.request, {
        url: `${CHATS_ENDPOINT}${chat_id}/`,
        method: "get"
    });
    const cronTab: CronTab = yield call(axios.request, {
        url: `${CRONTABS_ENDPOINT}${task.crontab_id}/`,
        method: "get"
    });

    const data = {
        pk: task.pk,
        name: task.name,
        chat: chat,
        cronTab: cronTab,
        message: message,
        chat_id: chat.pk,
        message_id: message.pk,
        crontab_id: task.crontab_id,
    }
    yield put(addTask(data))
}

function* fetchTaskData({payload}: ReturnType<typeof fetchTask>) {
    const task: BETask = yield call(axios.request, {
        url: `${TASKS_ENDPOINT}${payload.pk}/`,
        method: "get"
    });

    const [chat_id, message_id] = JSON.parse(task.args)

    const message: Message = yield call(axios.request, {
        url: `${MESSAGES_ENDPOINT}${message_id}/`,
        method: "get"
    });
    const chat: Chat = yield call(axios.request, {
        url: `${CHATS_ENDPOINT}${chat_id}/`,
        method: "get"
    });
    const cronTab: CronTab = yield call(axios.request, {
        url: `${CRONTABS_ENDPOINT}${task.crontab_id}/`,
        method: "get"
    });
    const data = {
        pk: task.pk,
        name: task.name,
        chat: chat,
        cronTab: cronTab,
        message: message,
        chat_id: chat.pk,
        message_id: message.pk,
        crontab_id: task.crontab_id,
    }
    yield put(setTask(data))
}

function* patchTaskData({payload}: ReturnType<typeof patchTask>) {
    const task: BETask = yield call(axios.request, {
        url: `${TASKS_ENDPOINT}${payload.pk}/`,
        method: "patch",
        data: payload.data,
    });

    const [chat_id, message_id] = JSON.parse(task.args)

    const message: Message = yield call(axios.request, {
        url: `${MESSAGES_ENDPOINT}${message_id}/`,
        method: "get"
    });
    const chat: Chat = yield call(axios.request, {
        url: `${CHATS_ENDPOINT}${chat_id}/`,
        method: "get"
    });
    const cronTab: CronTab = yield call(axios.request, {
        url: `${CRONTABS_ENDPOINT}${task.crontab_id}/`,
        method: "get"
    });
    const data = {
        pk: task.pk,
        name: task.name,
        chat: chat,
        cronTab: cronTab,
        message: message,
        chat_id: chat.pk,
        message_id: message.pk,
        crontab_id: task.crontab_id,
    }
    yield put(setTask(data))
}

function* deleteTaskData({payload}: ReturnType<typeof deleteTask>) {
    yield call(axios.request, {
        url: `${TASKS_ENDPOINT}${payload.pk}/`,
        method: "delete",
    });
    yield put(unsetTask(payload.pk))
}


export function* initSagas(): Generator {
    yield takeLatest(TaskActions.FETCH_TASKS, fetchTasksData);
    yield takeLatest(TaskActions.CREATE_TASK, createTaskData);
    yield takeLatest(TaskActions.FETCH_TASK, fetchTaskData);
    yield takeLatest(TaskActions.PATCH_TASK, patchTaskData);
    yield takeLatest(TaskActions.DELETE_TASK, deleteTaskData);
}
