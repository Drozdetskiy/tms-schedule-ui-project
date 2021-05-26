import { useState, Key, useEffect } from 'react';
import { Table, Divider, Space, Modal, Form, Input } from 'antd';

import { Chat, PatchChat } from '../../types';
import { useResetFormOnCloseModal } from '../../services'

import { getColumns, getFormLayout } from './service';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../reducers/root';
import { ChatActions } from '../../actions/chats';

const ChatsContainer = () => {
    const [isChatModalVisible, setIsChatModalVisible] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null)
    const [chatForm] = Form.useForm();
    const chatsListState = useSelector((state: IRootState) => state.chats)
    const dispatch = useDispatch()

    useResetFormOnCloseModal({
        form: chatForm,
        visible: isChatModalVisible,
    });

    useEffect(
        () => {
            chatForm.resetFields()
        },
        [chat, chatForm]);

    useEffect(
        () => {
            dispatch({type: ChatActions.FETCH_CHATS})
        }, [dispatch]);

    const onEditChatClick = (pk: Key) => {
        const selectedChat = chatsListState.chats.find(item => item.pk === pk) || null;
        setChat(selectedChat);
        setIsChatModalVisible(true);
    }

    const onDeleteChatClick = (pk: Key) => {
        deleteChat(pk)
    }

    const onCloseChatModal = () => {
        setIsChatModalVisible(false);
        setChat(null)
    };

    const onChatSave = () => {
        chatForm.submit();
    }

    const patchChat = (pk: number, data: PatchChat) => {
        dispatch({type: ChatActions.PATCH_CHAT, payload: {pk, data}})
    }

    const deleteChat = (pk: Key) => {
        dispatch({type: ChatActions.DELETE_CHAT, payload: {pk}})
    }

    return (
        <Form.Provider
            onFormFinish={(name, {values}) => {
                if (name === 'chatForm' && chat) {
                    const data = {chat_id: values.chat_id, name: values.name}
                    patchChat(chat.pk, data)
                    setIsChatModalVisible(false);
                }
            }}
        >
            <Space size={8} direction="vertical" style={{"width": "100%"}}>
                <Divider plain>Chats</Divider>
                <Modal
                    forceRender={true}
                    destroyOnClose={true}
                    title="Chat"
                    visible={isChatModalVisible}
                    onOk={onChatSave}
                    onCancel={onCloseChatModal}>
                    <Form
                        form={chatForm}
                        {...getFormLayout()}
                        name="chatForm"
                        initialValues={chat || undefined}
                    >
                        <Form.Item
                            label="Chat ID"
                            name="chat_id"
                            rules={[{required: true, message: 'Please input  chat id.'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{required: true, message: 'Please input name.'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Table rowKey="pk" dataSource={chatsListState.chats}
                       columns={getColumns(onEditChatClick, onDeleteChatClick)}/>
            </Space>
        </Form.Provider>
    );
};

export default ChatsContainer;