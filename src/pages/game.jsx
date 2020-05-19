import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import moment from 'moment'
import '../css/game.less'
import { getGameInfo, updateGameInfo, addGameRecord } from '@/api/pool'
import { blocks, imgs, betList } from '@/utility/game'
// import { connect } from 'react-redux'
// import { getBlocks, getImgs, getBet, getGameInfoList } from '@/redux/actions'

// const mapStateToProps = (state) => {
//   return {
//     blocksList: state.blocksList,
//     imgsList: state.imgsList,
//     betList: state.betList,
//     gameInfo: state.gameInfo.list,
//   }
// }
// @connect(mapStateToProps, { getBlocks, getImgs, getBet, getGameInfoList })
const qs = require('qs')

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blocks: [],
      bonus: [0,0,0,0,0,0,0,0], //押注分数情况
      imgs: [],
      count: 0,
      score: 0, //本金
      isAfterGame: false, //是否第一次游戏
      isRunningGame: false, //是否正在游戏
      credit: 0,  //奖金
      list: [0,1,2,3,4,5,6,13,20,27,34,41,48,47,46,45,44,43,42,35,28,21,14,7],
      pool: 0,  //奖池
      borrow: 0,
      tax: 0,
      taxRatio: 0,
      totalBonus: 0,  //总押注分数
      betList: [],  //押注列表
      betListResult: [],  //押注列表
      id: '',
      target: ''
    }
  }
  turnTarget(num) {
    let blocks = [...this.state.blocks]
    blocks = blocks.map((item) => {
      if(item.type === 2) return {...item,type:0}
      else if(item.type === 3) return {...item,type:1}
      else return item
    })
    blocks = blocks.map((item,index) => {
      if(index === num) {
        if(item.type === 1) return {...item,type:3}
        else return {...item,type:2}
      } else {
        return item
      }
    })
    this.setState({
      blocks
    })
  }
  randomNum(max,min) {
    return Math.floor(Math.random()*(max-min+1))+min
  }
  calcTarget() {
    let totalScore = 0, betList = [], targetList = [], randomNum = 0,
    pool = 0, tax = 0, extraTax = 0
    betList = this.state.betList.map(item => {
      let score = this.state.bonus[item.linkNum]
      let expectation = item.odds * score
      return {...item, score, expectation}
    })
    this.state.bonus.forEach(item => {
      totalScore += item
    })
    extraTax = Math.ceil(totalScore*0.05)
    tax = this.state.tax + extraTax
    pool = totalScore - extraTax + this.state.pool
    targetList =  betList.filter((item) => item.expectation <= pool)
    if(targetList.length === 0) {
      targetList = betList.slice(8, betList.length)
    }
    randomNum = this.randomNum(0, targetList.length-1)
    return { pool, tax, betListResult: betList, target: targetList[randomNum].name, id: targetList[randomNum].id }
  }
  startGame() {
    if(this.state.isRunningGame) return
    let flag = false, totalBonus = 0
    this.state.bonus.forEach(item => {
      totalBonus += item
      if(item > 0) flag = true
    })
    if(flag) {
      let score = this.state.score + this.state.credit
      if(this.state.isAfterGame) {
        if(score > totalBonus) {
          score -= totalBonus
        } else {
          message.info('无法投注！')
          return
        }
      }
      let targetInfo = this.calcTarget()
      this.setState({
        score,
        totalBonus,
        credit: 0,
        isRunningGame: true,
        pool: targetInfo.pool,
        tax: targetInfo.tax,
        betListResult: targetInfo.betListResult,
        target: targetInfo.target
      }, () => {
        let count = this.state.count, list = this.state.list, random = 72
        let timer = setInterval(() => {
          if(count === list.length) count = 0
          this.turnTarget(list[count++])
          if(random <= 0) {
            let target = this.state.blocks[list[count-1]]
            if(target.linkId === targetInfo.id) {
              if(target.bonusWin === 88) {
                clearInterval(timer)
                alert("恭喜中幸运奖！")
              } else {
                let credit = target.bonusWin * this.state.bonus[target.bonusNum]
                let pool = this.state.pool - credit
                this.setState({credit, pool, count, isAfterGame: true, isRunningGame: false},() => {
                  let data = {
                    id: this.state.id,
                    pool: this.state.pool*1,
                    tax: this.state.tax*1,
                    principal: this.state.score*1 + this.state.credit*1,
                  }
                  let data1 = {
                    ...data,
                    borrow: this.state.borrow*1,  //灌水资金
                    bonus: this.state.credit*1,  //奖金
                    taxRatio: this.state.taxRatio*1,  //抽税率
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),  //时间
                    totalDeposit: this.state.totalBonus*1 ,  //总押注
                    target: this.state.target,  //中奖水果
                    bonusDetail: this.state.betListResult //出奖明细 
                  }
                  delete data1.id
                  updateGameInfo(data).then(res => {
                    if (res.flag) {
                      message.info(res.msg)
                    } else {
                      message.error(res.msg)
                    }
                  })
                  addGameRecord(data1).then(res => {
                    if (res.flag) {
                      message.info(res.msg)
                    } else {
                      message.error(res.msg)
                    }
                  })
                  clearInterval(timer)
                })
              }
            }
          }
          random --
        }, 50)
      })
    } else {
      message.info('请先投注！')
    }
  }
  resetGame() {
    if(this.state.isRunningGame) return
    let score  = this.state.score + this.state.credit
    this.setState({
      score,
      credit: 0,
      bonus: [0,0,0,0,0,0,0,0],
    })
  }
  addBonus(index) {
    if(this.state.isRunningGame) return
    if(this.state.isAfterGame) {
      this.setState({
        bonus: [0,0,0,0,0,0,0,0],
        isAfterGame: false
      }, () => {this.actionBonus(index)})
    } else {
      this.actionBonus(index)
    }
  }
  actionBonus(index) {
    let bonus = [...this.state.bonus], score = this.state.score
    if(score > 0 && bonus[index] < 99) {
      score = score - 1
      bonus[index] = bonus[index] + 1
      this.setState({
        bonus,
        score
      })
    } else {
      message.info('无法投注！')
    }
  }
  componentDidMount() {
    this.setState({ 
      betList,
      blocks,
      imgs
    })
    getGameInfo({}).then(res => {
      let data = res[0]
      this.setState({
        pool: data.pool,
        tax: data.tax,
        taxRatio: data.taxRatio,
        score: data.principal,
        borrow: data.borrow,
        id: data._id
      })
    })
    // this.props.getBlocks()
    // this.props.getImgs()
    // this.props.getBet()
    // this.props.getGameInfoList()
  }
  render() {
    return (
      <div id="gameContainer">
        <div className="space-bottom">
          <div className="fl space-right">
            <div><span className="title-bonus">BONUS-WIN</span></div>
            <div><Input value={this.state.credit} className="credit-num" /></div>
          </div>
          <div className="fl">
            <div><span className="title-credit">CREDIT</span></div>
            <div><Input value={this.state.score} className="credit-num" /></div>
          </div>
          <div style={{clear:'both'}}></div>
        </div>
        <div className="space-bottom">
          {
            this.state.blocks.map((item,index) => {
              switch(item.type) {
                case 1:
                  return <div key={index} className={"block new-line " + item.bg}></div>
                case 2:
                  return <div key={index} className={"block target " + item.bg}></div>
                case 3:
                  return <div key={index} className={"block new-line target " + item.bg}></div>
                case 4:
                  return <div key={index} className="block no-border"></div>
                default:
                  return <div key={index} className={"block " + item.bg}></div>
              }
            })
          }
          <div style={{clear:'both'}}></div>
        </div>
        <div className="space-bottom">
          <Button type="primary" onClick={this.startGame.bind(this)} className="space-right" >开始</Button>
          <Button type="primary" onClick={this.resetGame.bind(this)}>复位</Button>
        </div>
        <div>
          {
            this.state.bonus.map((item,index) => 
              <div key={index} className="elc-font fl">{item}</div>
            )
          }
          <div style={{clear:'both'}}></div>
        </div>
        <div>
          {
            this.state.imgs.map((item,index) => 
              <div key={index}  onClick={this.addBonus.bind(this,index)}  className="btn-style fl">
                <div>
                  <img className="img-box" src={item.img} alt="broken"/>
                </div>
                <div className="num-style">{item.multiple}</div>
              </div>
            )
          }
          <div style={{clear:'both'}}></div>
        </div>
      </div>
    )
  }
}
export default Game
