import React from 'react';
import { PropTypes } from 'prop-types';
import { css } from 'astroturf';

const styles = css`
    .chat-panel-header {
        position: relative;
        height: 50px;
        background-color: rgba(252,210,118,0.65);
        border-top-right-radius: 30px;
        box-shadow: 0 6px 12px -10px #888;
        .chatter-name {
            position: absolute;
            margin: 16px 0 0 20px;
            font-size: 17px;
            color: #aa8f7c;
            letter-spacing: 2px;
        }
        .more {
            position: absolute;
            top: 16px;
            right: 20px;
            color: #b59682;
            cursor: pointer;
            font-size: 20px;
            transition: all .3s;
            &:hover {
                color: #8c6851;
            }
        }
    }
`

const ChatPanelHeader = () => {
    return (
        <div className='chat-panel-header'>
            <div className='chatter-name'>咸大猪</div>
            <i className='iconfont more'>&#xe618;</i>
        </div>
    )
};

export default ChatPanelHeader;