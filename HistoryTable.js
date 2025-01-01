import React from "react";
import {Row, Col, Input, Button, Drawer, Table} from "antd";
import './E2_.css';
import E2Class from './E2';
class HistoryTable extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
        }
    }
    componentDidMount() {
        let resArr=[];
        try{
            let resArr=JSON.parse(localStorage.getItem('historyTableData'));
            this.setState({dataSource:resArr})
        }catch (e) {
            
        }
    }

    deleteHistory=(data)=> {
        // console.log(data)
        let resArr = [];
        try {
            resArr=JSON.parse(localStorage.getItem('historyTableData'));
            console.log(resArr)
            // for(let i = 0; i < resArr.length; i++){
            //     // const value = localStorage.getItem(key);
            //     if(data.key == resArr[i].key){
            //         delete resArr[i];
            //         break;
            //     }
            //
            const index = resArr.findIndex(item => item.key === data.key); // 找到要删除项的索引
            if (index !== -1) {
                resArr.splice(index, 1); // 从索引位置删除 1 项
            }
            localStorage.setItem('historyTableData',JSON.stringify(resArr));
            this.E2calss.createRandomData();

        }catch (e) {
            console.log(e);
        }
    }
    getNowTime=()=> {
        const now = new Date();
        const year = now.getFullYear(); // 获取年份
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 获取月份，月份从0开始，因此要加1，并且确保是两位数
        const day = String(now.getDate()).padStart(2, '0'); // 获取日期，确保是两位数
        const hours = String(now.getHours()).padStart(2, '0'); // 获取小时
        const minutes = String(now.getMinutes()).padStart(2, '0'); // 获取分钟
        const seconds = String(now.getSeconds()).padStart(2, '0'); // 获取秒钟
        // const result = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    createRandomData=()=> {
        try {
            let resArr=JSON.parse(localStorage.getItem('historyTableData'));
            // console.log(this.getNowTime())
            // let obj = {
            //     key:'-1',
            //     timestramp: this.getNowTime(),
            //     operation:'1+1=2',
            // }
            // resArr.push(obj);
            localStorage.setItem('historyTableData',JSON.stringify(resArr));
        }catch (e) {
            console.log(e)
        }
    }

    dataSource = [
        {
            key: '1',
            timestramp: '胡彦斌',
            operation: 32,
        },
        {
            key: '2',
            timestramp: '胡彦祖',
            operation: 42,
        },
    ];

    columns = [
        {
            title: '日期',
            dataIndex: 'timestramp',
            key: 'timestramp',
        },
        {
            title: '记录',
            dataIndex: 'operation',
            key: 'operation',
        },
        {
            title:'Action',
            key:'action',
            render: (text, record) => (
                <a onClick={()=>this.deleteHistory(record)}>Delete</a>
            ),
        }
    ];

    render() {
        return(
            <>
                {/*<Button id="seven_btn" className="btn_oper_yellow" onClick={this.createRandomData}>History</Button>*/}
                <Table dataSource={this.state.dataSource} columns={this.columns} />
            </>
        )
    }
}

export default HistoryTable;