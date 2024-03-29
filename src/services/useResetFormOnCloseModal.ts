import { useRef, useEffect } from 'react';

import { FormInstance } from 'antd';


const useResetFormOnCloseModal = ({form, visible}: { form: FormInstance; visible: boolean }) => {
    const prevVisibleRef = useRef<boolean>();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);

    const prevVisible = prevVisibleRef.current;

    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [visible, form, prevVisible]);
};

export default useResetFormOnCloseModal;
