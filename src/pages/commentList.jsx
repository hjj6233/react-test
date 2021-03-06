import React, { Component } from 'react'
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons'

export default class CommentList extends Component {
  constructor() {
    super()
    this.state = {
      likes: 0,
      dislikes: 0,
      action: null,
    }
  }
  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    })
  }
  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    })
  }
  render() {
    const { likes, dislikes, action } = this.state;

    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          {
            React.createElement(action === 'liked' ? LikeFilled : LikeOutlined,{onClick: this.like})
          }
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          {
            React.createElement(action === 'liked' ? DislikeFilled : DislikeOutlined,{onClick: this.dislike})
          }
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ]

    return (
      <Comment
        actions={actions}
        author={<a>Han Solo</a>}
        avatar={
          <Avatar
            src={require("@/assets/images/libai.jpg")}
            alt="Han Solo"
          />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully
            and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    )
  }
}
