import { useState, Key, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, Divider, Space, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

import { MessageActions } from '../../actions/messages'

import { useResetFormOnCloseModal } from '../../services'
import { Message, PatchMessage } from '../../types';
import { IRootState } from '../../reducers/root'


import { getColumns, getFormLayout } from './service';

const MessagesContainer = () => {
    const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
    const [message, setMessage] = useState<Message | null>(null)
    const [messageForm] = Form.useForm();
    const dispatch = useDispatch()
    const messageList = useSelector((state: IRootState) => state.messages.messages)

    useResetFormOnCloseModal({
        form: messageForm,
        visible: isMessageModalVisible,
    });

    useEffect(
        () => {
            messageForm.resetFields()
        },
        [message, messageForm]);

    useEffect(
        () => {
            dispatch({type: MessageActions.FETCH_MESSAGES})
        }, [dispatch]);

    const onEditMessageClick = (pk: Key) => {
        const messageNeeded = messageList.find(item => item.pk === pk) || null;
        setMessage(messageNeeded);
        setIsMessageModalVisible(true);
    }

    const onDeleteMessageClick = (pk: Key) => {
        deleteMessage(pk)
    }

    const onAddMessageClick = () => {
        setIsMessageModalVisible(true);
    }

    const onCloseMessageModal = () => {
        setIsMessageModalVisible(false);
        setMessage(null)
    };

    const onMessageSave = () => {
        messageForm.submit();
    }

    const patchMessage = (pk: number, data: PatchMessage) => {
        dispatch({type: MessageActions.PATCH_MESSAGE, payload: {pk, data}})
    }

    const createMessage = (data: PatchMessage) => {
        dispatch({type: MessageActions.CREATE_MESSAGE, payload: {data}})
    }

    const deleteMessage = (pk: Key) => {
        dispatch({type: MessageActions.DELETE_MESSAGE, payload: {pk}})
    }

    return (
        <Form.Provider
            onFormFinish={(name, {values}) => {
                if (name === 'messageForm') {
                    const data = {
                        title: values.title,
                        message_text: values.message_text
                    }
                    if (message) {
                        patchMessage(message.pk, data)
                    } else {
                        createMessage(data)
                    }
                    setIsMessageModalVisible(false);
                }
            }}
        >
            <Space size={8} direction="vertical" style={{"width": "100%"}}>
                <Divider plain>Messages</Divider>
                <Button onClick={onAddMessageClick}><PlusOutlined/></Button>
                <Modal
                    forceRender={true}
                    destroyOnClose={true}
                    title="Message"
                    visible={isMessageModalVisible}
                    onOk={onMessageSave}
                    onCancel={onCloseMessageModal}>
                    <Form
                        form={messageForm}
                        {...getFormLayout()}
                        name="messageForm"
                        initialValues={{...message}}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{required: true, message: 'Please input message title.'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Text"
                            name="message_text"
                            rules={[{required: true, message: 'Please input text.'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Table rowKey="pk" dataSource={messageList}
                       columns={getColumns(onEditMessageClick, onDeleteMessageClick)}/>
            </Space>
        </Form.Provider>
    );
};

export default MessagesContainer;