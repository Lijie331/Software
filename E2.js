import React from "react";
import {Row, Col, Input, Button, Drawer} from "antd";
import './E2_.css';
import historyTable from "./HistoryTable";
import HistoryTable from "./HistoryTable";
class E2Class extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            visible: false,
            inputOper:"",
        }
        console.log("constructor Execute");
    }

    componentDidMount() {
         console.log("componentDidMount Execute");
    }

    generateUUID=()=>{
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;  // 生成一个0到15之间的随机数
            var v = c === 'x' ? r : (r & 0x3 | 0x8); // 生成一个符合UUID标准的字符
            return v.toString(16);  // 转换为十六进制并返回
        });
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
    createRandomData=(oldInput)=> {
        try {
            let resArr=JSON.parse(localStorage.getItem('historyTableData'));
            // console.log(this.getNowTime())
           if(oldInput != "")
           {
               let obj = {
                   key:this.generateUUID(),
                   timestramp: this.getNowTime(),
                   operation:oldInput,
               }
               resArr.push(obj);
           }
            localStorage.setItem('historyTableData',JSON.stringify(resArr));
        }catch (e) {
            console.log(e)
        }
    }
    handleSubmit = (e) => {
        let oldInput=this.state.inputOper;
        let operArr=oldInput.split(" ");
        console.log(operArr);
        let resArr=[];
        let result=0;
        for(let i=0;i<operArr.length;i++){
            let item=operArr[i];
            let firstNumber=0;
            let secondNumber=0;
            let res=0;
            switch (item){
                case "+":
                    break;
                case "/":
                    firstNumber=parseFloat(resArr.pop());
                    secondNumber=parseFloat(operArr[++i]);
                    if(secondNumber==0){
                        resArr.push(0);
                    }
                    else{
                        res=firstNumber/secondNumber;
                        resArr.push(res);
                    }
                    break;
                case "*":
                    firstNumber=parseFloat(resArr.pop());
                    secondNumber=parseFloat(operArr[++i]);
                    res=firstNumber*secondNumber;
                    resArr.push(res);
                    break;
                default:
                    resArr.push(item);

            }
        }
        console.log("resArr",resArr);
        for(let i=0;i<resArr.length;i++){
            result+=parseFloat(resArr[i]);
        }
        oldInput=oldInput+" = "+result;
        this.createRandomData(oldInput);
        this.setState({inputOper:oldInput});
    }
    handleClick=(e)=>{
        let newInput = e.target.innerText;
        console.log("newInput:"+newInput);
        let oldInput=this.state.inputOper;
        console.log("oldInput:"+oldInput);
        switch (newInput){
            case "+":
            case "*":
            case "/":
                oldInput=oldInput+" "+newInput+" ";
                break;
            case "Back":
                oldInput = oldInput.trimEnd();
                if(oldInput.length == 1)
                {
                    oldInput = oldInput.slice(0, -1);
                }
                else
                {
                    while(oldInput[oldInput.length-1] != " "){
                        oldInput = oldInput.slice(0, -1);
                    }
                }

                break;
            default:
                oldInput=oldInput+newInput
        }

        this.setState(
            {
                inputOper:oldInput
            });
    }
    handleHistory=()=>{
        this.setState({visible:true});
    }
    onClose=()=>{
        this.setState({visible:false});
    }
    render()
    {
        console.log("render Execute");
        return(
            <>
                <div id="cal_main" >
                    <div id="div_first_row">
                        <input className="input_cal" value={this.state.inputOper}/>
                    </div>
                    <div id="div_second_row">
                        <Row>
                            <Col span={6}><Button className="btn_oper_gray" onClick={this.handleClick}>AC</Button></Col>
                            <Col span={6}><Button className="btn_oper_gray" onClick={this.handleClick}>Back</Button></Col>
                            <Col span={6}><Button className="btn_oper_gray" onClick={this.handleClick}>%</Button></Col>
                            <Col span={6}><Button className="btn_oper_yellow" onClick={this.handleClick}>/</Button></Col>
                        </Row>
                    </div>
                    <div id="div_third_row">
                        <Row>
                            <Col span={6}><Button className="btn_oper_black" onClick={this.handleClick}>1</Button></Col>
                            <Col span={6}><Button className="btn_oper_black" onClick={this.handleClick}>2</Button></Col>
                            <Col span={6}><Button className="btn_oper_black" onClick={this.handleClick}>3</Button></Col>
                            <Col span={6}><Button className="btn_oper_yellow" onClick={this.handleClick}>*</Button></Col>
                        </Row>
                    </div>
                    <div id="div_fourth_row">
                        <Row>
                            <Col span={6}><Button className="btn_oper_black" onClick={this.handleClick}>4</Button></Col>
                            <Col span={6}><Button className="btn_oper_black" onClick={this.handleClick}>5</Button></Col>
                            <Col span={6}><Button className="btn_oper_black" onClick={this.handleClick}>6</Button></Col>
                            <Col span={6}><Button className="btn_oper_yellow" onClick={this.handleClick}>+</Button></Col>
                        </Row>
                    </div>
                    <div id="div_fifth_row">
                        <Row>
                            <Col span={6}><Button className="btn_oper_black" onClick={this.handleClick}>7</Button></Col>
                            <Col span={6}><Button className="btn_oper_black" onClick={this.handleClick}>8</Button></Col>
                            <Col span={6}><Button className="btn_oper_black" onClick={this.handleClick}>9</Button></Col>
                            <Col span={6}><Button className="btn_oper_yellow" onClick={this.handleClick}>-</Button></Col>
                        </Row>
                    </div>
                    <div id="div_sixth_row">
                        <Row>
                            <Col span={12}><Button className="btn_oper_black" onClick={this.handleClick}>0</Button></Col>
                            <Col span={6}><Button className="btn_oper_black" onClick={this.handleClick}>.</Button></Col>
                            <Col span={6}><Button className="btn_oper_yellow" onClick={this.handleSubmit}>=</Button></Col>
                        </Row>
                    </div>
                    <div id="div_seventh_row">
                        <Row>
                            <Col span={24}><Button id="seven_btn" className="btn_oper_yellow" onClick={this.handleHistory}>History</Button></Col>
                        </Row>
                    </div>

                </div>
                {/*Drawer与main是平级的关系*/}
                <Drawer
                    title="计算历史"
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    // mask={false}
                    width={"30%"}
                >
                    <HistoryTable><
                    /HistoryTable>
                </Drawer>
            </>
        )
    }
}


export default E2Class;