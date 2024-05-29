import React, { useEffect, useState } from 'react'
import { Table } from "antd"

const columns = [
    {
        title: "Mô Hình",
        dataIndex: "key",
    },
    {
        title: "RMSE",
        dataIndex: "index1",
        align: "center",
    },
    {
        title: "MAE",
        dataIndex: "index2",
        align: "center",
    },
    {
        title: "R2",
        dataIndex: "index3",
        align: "center",
    },
    {
        title: "Recall",
        dataIndex: "index4",
        align: "center",
    },
    {
        title: "Precision",
        dataIndex: "index5",
        align: "center",
    },
    {
        title: "F1",
        dataIndex: "index6",
        align: "center",
    },
    {
        title: "Accuracy",
        dataIndex: "index7",
        align: "center",
    }
]

const Model = () => {

    const [resultTrain, setResultTrain] = useState([])
    const [modelTrain, setModelTrain] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [loading, setLoading] = useState(false)

    const convertData = (data) => {
        const convertedData = [];
        for (const model in data.models) {
            const {
                Accuracy,
                F1,
                MAE,
                Precision,
                R2,
                RMSE,
                Recall
            } = data.models[model];

            convertedData.push({
                key: model,
                index1: RMSE,
                index2: MAE,
                index3: R2,
                index4: Recall,
                index5: Precision,
                index6: F1,
                index7: Accuracy
            });
        }
        return convertedData;
    };

    const getModel = async () => {
        try {
            const response = await fetch('http://localhost:8888/model', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            const model = Object.keys(data)[0]
            const {
                RMSE,
                MAE,
                R2,
                Recall,
                Precision,
                F1,
                Accuracy
            } = data[model]
            const modelArray = [{
                key: model,
                index1: RMSE,
                index2: MAE,
                index3: R2,
                index4: Recall,
                index5: Precision,
                index6: F1,
                index7: Accuracy
            }]
            setModelTrain(modelArray)
        } catch (error) {
            console.log(error)
        }
    }

    const getResult = async () => {
        try {
            const response = await fetch('http://localhost:8888/result', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (data.isTraining === false) {
                const convertedData = convertData(data)
                setResultTrain(convertedData)
                setLoading(false)
            } else {
                setLoading(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getResult()
        getModel()
    }, [])

    const handleTrain = async () => {
        setLoading(true)
        const response = await fetch('http://localhost:8888/train', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        if (!data.isTraining) {
            const convertedData = convertData(data)
            setResultTrain(convertedData)
            setLoading(false)
        }
    }

    const handleApply = () => {
        const selectedRowKeys = selectedRows.map(row => row.key)
        const selectedModel = selectedRowKeys[0]
        const model = {     
            "model": selectedModel
        }
        fetch('http://localhost:8888/model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
            .then(
                getModel()
            )
            .then(
                getResult()
            )
    }

    return (
        <div>
            <h3 className='mb-4 title'>Huấn Luyện Mô Hình</h3>
            <div>
                <Table
                    title={() => <h5 style={{ textAlign: 'center', color: '#47ad24' }}>Mô Hình Đang Sử Dụng</h5>}
                    columns={columns}
                    dataSource={modelTrain}
                    pagination={false}
                />

                <hr className='my-5' style={{ width: '80%', margin: '0 auto' }} />

                <Table
                    title={() => <h5 style={{ textAlign: 'center', color: '#ed464d' }}>Mô Hình Huấn Luyện</h5>}
                    rowSelection={{
                        type: 'radio',
                        onChange: (selectedRowKeys, selectedRows) => setSelectedRows(selectedRows)
                    }}
                    columns={columns}
                    dataSource={resultTrain}
                    pagination={false}
                    loading={loading}
                    footer={() => (
                        <>
                            <button className='btn btn-primary border-0 rounded-3 my-2' type='submit' onClick={handleTrain}>Huấn Luyện</button>
                            <button className='btn btn-success border-0 rounded-3 my-2' type='submit' style={{ float: 'right' }} onClick={handleApply}>Áp Dụng</button>
                        </>
                    )}
                />

            </div>
        </div>
    )
}

export default Model