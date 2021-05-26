import { useState, Key, useEffect } from 'react';
import { Table, Divider, Space, Modal, Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

import { CronTab, PatchCronTab, PatchMessage } from '../../types';
import { useResetFormOnCloseModal } from '../../services'


import { getColumns, getFormLayout } from './service';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../reducers/root';
import { CronTabsActions } from '../../actions/cronTabs';

const CronTabListContainer = () => {
    const [isCronTabModalVisible, setIsCronTabModalVisible] = useState(false);
    const [cronTab, setCronTab] = useState<CronTab | null>(null)
    const [cronTabForm] = Form.useForm();
    const dispatch = useDispatch()
    const cronTabList = useSelector((state: IRootState) => state.cronTabs.cronTabs)

    useResetFormOnCloseModal({
        form: cronTabForm,
        visible: isCronTabModalVisible,
    });

    useEffect(
        () => {
            cronTabForm.resetFields()
        },
        [cronTab, cronTabForm]);

    useEffect(
        () => {
            dispatch({type: CronTabsActions.FETCH_CRONTABS})
        }, [dispatch]);

    const onEditCronTabClick = (pk: Key) => {
        const selectedCronTab = cronTabList.find(item => item.pk === pk) || null;
        setCronTab(selectedCronTab);
        setIsCronTabModalVisible(true);
    }

    const onDeleteCronTabClick = (pk: Key) => {
        deleteTask(pk)
    }

    const onAddCronTabClick = () => {
        setIsCronTabModalVisible(true);
    }

    const onCloseCronTabModal = () => {
        setIsCronTabModalVisible(false);
        setCronTab(null)
    };

    const onCronTabSave = () => {
        cronTabForm.submit();
    }

    const patchCronTab = (pk: number, data: PatchCronTab) => {
        dispatch({type: CronTabsActions.PATCH_CRONTAB, payload: {pk, data}})
    }

    const createCronTab = (data: PatchCronTab) => {
        dispatch({type: CronTabsActions.CREATE_CRONTAB, payload: {data}})
    }

    const deleteTask = (pk: Key) => {
        dispatch({type: CronTabsActions.DELETE_CRONTAB, payload: {pk}})
    }

    return (
        <Form.Provider
            onFormFinish={(name, {values}) => {
                if (name === 'cronTab') {
                    const data = {
                        minute: values.minute,
                        hour: values.hour,
                        day_of_week: values.day_of_week,
                        day_of_month: values.day_of_month,
                        month_of_year: values.month_of_year,
                    }
                    if (cronTab) {
                        patchCronTab(cronTab.pk, data)
                    } else {
                        createCronTab(data)
                    }
                    setIsCronTabModalVisible(false);
                }
            }}
        >
            <Space size={8} direction="vertical" style={{"width": "100%"}}>
                <Divider plain>CronTabs</Divider>
                <Button onClick={onAddCronTabClick}><PlusOutlined/></Button>
                <Modal
                    forceRender={true}
                    destroyOnClose={true}
                    title="CronTab"
                    visible={isCronTabModalVisible}
                    onOk={onCronTabSave}
                    onCancel={onCloseCronTabModal}>
                    <Form
                        form={cronTabForm}
                        {...getFormLayout()}
                        name="cronTab"
                        initialValues={cronTab || undefined}
                    >

                        <Form.Item
                            label="Minutes"
                            name="minute"
                            rules={[{required: true, message: 'Please input minutes.'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Hours"
                            name="hour"
                            rules={[{required: true, message: 'Please input house.'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Days of the week"
                            name="day_of_week"
                            rules={[{required: true, message: 'Please input days of the week.'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Days Of The Month"
                            name="day_of_month"
                            rules={[{required: true, message: 'Please input  chat days of the month.'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Month Of The Year"
                            name="month_of_year"
                            rules={[{required: true, message: 'Please input month of the year.'}]}
                        >
                            <Input/>
                        </Form.Item>

                    </Form>
                </Modal>
                <Table rowKey="pk" dataSource={cronTabList}
                       columns={getColumns(onEditCronTabClick, onDeleteCronTabClick)}/>
            </Space>
        </Form.Provider>
    );
};

export default CronTabListContainer