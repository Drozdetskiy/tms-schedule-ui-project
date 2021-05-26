import { Divider, Space, Form, Input, Checkbox, Button, Row } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const layout = {
    labelCol: {span: 56},
    wrapperCol: {span: 56},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const SignInContainer = () => {
    const onSignInSubmit = (values: any) => {
        console.log('Success:', values);
    }

    return (
        <Space size={8} direction="vertical" style={{"width": "100%"}}>
            <Divider plain>Sign In</Divider>
            <Row align="middle" justify="center" style={{minHeight: '100vh'}}>
                <Form
                    {...layout}
                    name="signIn"
                    onFinish={onSignInSubmit}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Enter your username.'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input name.'}]}
                    >
                        <Input.Password
                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        />
                    </Form.Item>
                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </Space>
    );
};

export default SignInContainer;