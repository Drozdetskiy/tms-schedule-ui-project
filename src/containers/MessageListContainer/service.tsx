import { Key } from 'react';

import { Space, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { Message } from '../../types';

export const getColumns = (onEditClick: (pk: Key) => void, onDeleteClick: (pk: Key) => void) => {
    return [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Text",
            dataIndex: "message_text",
            key: "message_text",
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            key: "updated_at",
        },
        {
            title: "Action",
            key: "action",
            render: (_: Message, record: { pk: React.Key }) => (
                <Space size="middle">
                    <Button onClick={() => onEditClick(record.pk)}><EditOutlined/></Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteClick(record.pk)}>
                        <DeleteOutlined/>
                    </Popconfirm>
                </Space>
            )
        }
    ];
}

export const getFormLayout = () => {
    return {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
}