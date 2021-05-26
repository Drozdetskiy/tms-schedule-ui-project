import { useState, Key, useEffect } from 'react';
import { Table, Divider, Space, Form, Modal, Input, Select, Button } from 'antd';
import { PatchBETask, Task } from '../../types';
import { getColumns, getFormLayout } from './service';
import { useDispatch, useSelector } from 'react-redux';
import { TaskActions } from '../../actions/tasks';
import { IRootState } from '../../reducers/root';
import { PlusOutlined } from '@ant-design/icons';
import { DEFAULT_TASK } from '../../constants';

const {Option} = Select;

const TaskListContainer = () => {
    const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);

    const [task, setTask] = useState<Task | null>(null)
    const [taskForm] = Form.useForm();
    const dispatch = useDispatch()
    const taskList = useSelector((state: IRootState) => state.tasks.tasks)
    const chatList = useSelector((state: IRootState) => state.chats.chats)
    const messageList = useSelector((state: IRootState) => state.messages.messages)
    const cronTabList = useSelector((state: IRootState) => state.cronTabs.cronTabs)

    useEffect(
        () => {
            taskForm.resetFields()
        },
        [task, taskForm]);

    useEffect(
        () => {
            dispatch({type: TaskActions.FETCH_TASKS})
        }, [dispatch]);

    const onCloseTaskModal = () => {
        setIsTaskModalVisible(false);
        setTask(null)
    };

    const onTaskSave = () => {
        taskForm.submit();
    }

    const patchTask = (pk: number, data: PatchBETask) => {
        dispatch({type: TaskActions.PATCH_TASK, payload: {pk, data}})
    }

    const createTask = (data: PatchBETask) => {
        dispatch({type: TaskActions.CREATE_TASK, payload: {data}})
    }

    const deleteTask = (pk: Key) => {
        dispatch({type: TaskActions.DELETE_TASK, payload: {pk}})
    }

    const onAddTaskClick = () => {
        setIsTaskModalVisible(true);
    }

    const onEditTaskClick = (pk: Key) => {
        const selectedTask = taskList.find(item => item.pk === pk) || null;
        setTask(selectedTask);
        setIsTaskModalVisible(true);
    }

    const onDeleteTaskClick = (pk: Key) => {
        deleteTask(pk)
    }

    return (
        <Form.Provider
            onFormFinish={(name, {values}) => {
                if (name === 'task') {
                    const data = {
                        name: values.name,
                        args: JSON.stringify([values.chat_id, values.message_id]),
                        crontab_id: values.crontab_id,
                        task: DEFAULT_TASK,
                    }
                    if (task) {
                        patchTask(task.pk, data)
                    } else {
                        createTask(data)
                    }
                    setIsTaskModalVisible(false);
                }
            }}
        >
            <Space size={8} direction="vertical" style={{"width": "100%"}}>
                <Divider plain>Tasks</Divider>
                <Button onClick={onAddTaskClick}><PlusOutlined/></Button>
                <Modal
                    forceRender={true}
                    destroyOnClose={true}
                    title="Task"
                    visible={isTaskModalVisible}
                    onOk={onTaskSave}
                    onCancel={onCloseTaskModal}>
                    <Form
                        form={taskForm}
                        {...getFormLayout()}
                        name="task"
                        initialValues={task || undefined}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{required: true, message: 'Please input name.'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Chat name"
                            name="chat_id"
                            rules={[{required: true, message: 'Please choose a chat.'}]}
                        >
                            <Select>
                                {chatList.map(chat => (
                                    <Option value={chat.pk} key={chat.pk}>{chat.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Message title"
                            name="message_id"
                            rules={[{required: true, message: 'Please choose a message.'}]}
                        >
                            <Select>
                                {messageList.map(message => (
                                    <Option value={message.pk} key={message.pk}>{message.title}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Crontab name"
                            name="crontab_id"
                            rules={[{required: true, message: 'Please choose a cronTab.'}]}
                        >
                            <Select>
                                {cronTabList.map(cronTab => (
                                    <Option value={cronTab.pk} key={cronTab.pk}>{cronTab.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                <Table rowKey="pk" dataSource={taskList} columns={getColumns(onEditTaskClick, onDeleteTaskClick)}/>
            </Space>
        </Form.Provider>
    );
};

export default TaskListContainer