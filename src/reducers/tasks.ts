import { AnyAction } from 'redux'
import { TaskActions } from '../actions/tasks'
import { Task } from '../types';

export interface ITasksReducer {
    tasks: Task[]
}

const defaultState: ITasksReducer = {
    tasks: [],
}

export const tasksReducer = (
    state: ITasksReducer = defaultState,
    action: AnyAction
): ITasksReducer => {
    const { payload } = action

    switch (action.type) {
        case TaskActions.SET_TASKS:
            return { ...state, tasks: payload.data }

        case TaskActions.SET_TASK:
            return {
                ...state,
                tasks: state.tasks.map(
                    task => (task.pk === payload.data.pk) ?
                        { ...task, ...payload.data } : { ...task }
                )
            }

        case TaskActions.ADD_TASK:
            return { ...state, tasks: [ ...state.tasks, payload.data ] }

        case TaskActions.UNSET_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.pk !== payload.pk)
            }
        default:
            return state
    }
}
