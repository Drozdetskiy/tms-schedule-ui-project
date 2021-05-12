import { Key } from 'react';

import { Space, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { Task } from '../../types';

export const getColumns = (onEditClick: (pk: Key) => void, onDeleteClick: (key: Key) => void) => {
    return [{
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
        {
            title: "Chat Name",
            dataIndex: ["chat", "name"],
            key: "chat.name",
        },
        {
            title: "Message Title",
            dataIndex: ["message", "title"],
            key: "message.title",
        },
        {
            title: "ChronTab Name",
            dataIndex: ["cronTab", "name"],
            key: "cronTab.name",
        },
        {
            title: "Action",
            key: "action",
            render: (_: Task, record: { pk: React.Key }) => (
                <Space size="middle">
                    <Button onClick={() => onEditClick(record.pk)}><EditOutlined/></Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteClick(record.pk)}>
                        <DeleteOutlined/>
                    </Popconfirm>
                </Space>
            )
        }
    ]
};

export const getFormLayout = () => {
    return {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
}