import React from "react";
import { Alert, Space } from 'antd';

const Error = () => {
    return(
        <div>
            <Space
                direction="vertical"
                style={{
                width: '100%',
                }}
                >
                    
                <Alert
                message="Error"
                description="This is an error message about copywriting."
                type="error"
                showIcon
                />


            </Space>
        </div>
    )

}

export default Error;