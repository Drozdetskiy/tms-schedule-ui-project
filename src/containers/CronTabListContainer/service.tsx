import { Key } from 'react';

import { Space, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { CronTab } from '../../types';

export const getColumns = (onEditClick: (pk: Key) => void, onDeleteClick: (key: Key) => void) => {
    return [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Minutes",
            dataIndex: "minute",
            key: "minute",
        },
        {
            title: "Hours",
            dataIndex: "hour",
            key: "hour",
        },
        {
            title: "Days of the Week",
            dataIndex: "day_of_week",
            key: "day_of_week",
        },
        {
            title: "Days of the Month",
            dataIndex: "day_of_month",
            key: "day_of_month",
        },
        {
            title: "Month of the Year",
            dataIndex: "month_of_year",
            key: "month_of_year",
        },
        {
            title: "Action",
            key: "action",
            render: (_: CronTab, record: { pk: React.Key }) => (
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