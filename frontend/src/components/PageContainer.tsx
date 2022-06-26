import { Space } from 'antd'
import React from 'react'

export const PageContainer: React.FC<any> = ({ children }) => {
  return (
    <Space
      direction="vertical"
      style={{
        maxWidth: '80%',
        display: 'flex',
        margin: '0 auto',
        paddingBottom: 32,
      }}
    >{children}</Space>
  )
}
