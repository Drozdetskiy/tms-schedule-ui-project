import { AnyAction } from 'redux'
import { Task, PatchTask } from '../types';


export enum TaskActions{
    SET_TASKS = 'SET_TASKS',
    SET_TASK = 'SET_TASK',
    ADD_TASK = 'ADD_TASK',
    CREATE_TASK = 'CREATE_TASK',
    PATCH_TASK = 'PATCH_TASK',
    DELETE_TASK = 'DELETE_TASK',
    FETCH_TASKS = 'FETCH_TASKS',
    FETCH_TASK = 'FETCH_TASK',
    UNSET_TASK = 'UNSET_TASK',
}

export const fetchTasks = ():AnyAction => ({
    type: TaskActions.FETCH_TASKS,
})

export const fetchTask = (pk: number):AnyAction => ({
    type: TaskActions.FETCH_TASK,
    payload: {pk}
})

export const setTasks = (data: Task[]):AnyAction => ({
    type: TaskActions.SET_TASKS,
    payload: {data}
})

export const setTask = (data: Task):AnyAction => ({
    type: TaskActions.SET_TASK,
    payload: {data}
})

export const addTask = (data: PatchTask):AnyAction => ({
    type: TaskActions.ADD_TASK,
    payload: {data}
})

export const createTask = (data: PatchTask):AnyAction => ({
    type: TaskActions.CREATE_TASK,
    payload: {data},
})

export const patchTask = (pk: number, data: PatchTask):AnyAction => ({
    type: TaskActions.PATCH_TASK,
    payload: {pk, data}
})

export const deleteTask = (pk: number):AnyAction => ({
    type: TaskActions.DELETE_TASK,
    payload: {pk},
})

export const unsetTask = (pk: number):AnyAction => ({
    type: TaskActions.UNSET_TASK,
    payload: {pk}
})
