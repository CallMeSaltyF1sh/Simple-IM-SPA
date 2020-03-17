import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { css } from 'astroturf';

const styles = css`
    .edit-area {
        position: relative;
        width: 100%;
        height: 160px;
        box-sizing: border-box;
        padding-bottom: 50px;
        border-bottom-right-radius: 30px;
        background-color: rgba(252,210,118,0.25);
        box-shadow: 0 -6px 12px -10px #888;
        .tools-bar {
            display: flex;
            flex-direction: row;
            padding-left: 18px;
            width: 100%;
            height: 40px;
            box-sizing: border-box;
            .icon {
                margin: 10px 11px 0 0;
                color: #b59682;
                font-size: 19px;
                transition: all .3s;
                &:hover {
                    color: #8c6851;
                }
            }
        }
        .txt-area {
            width: 100%;
            height: 75px;
            padding: 0 12px;
            box-sizing: border-box;
            border: 0;
            outline: none;
            resize: none;
            background-color: transparent;
            color: #b59682;
            &::-webkit-scrollbar {
                width: 8px;
                height: 1px;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                box-shadow: inset 0 0 3px rgba(0,0,0,0.2);
                background: rgba(153, 115, 91, 0.4);
            }
            &::-webkit-scrollbar-track {
                border-radius: 10px;
                background: transparent;
            }
        }
        .send-msg {
            display: flex;
            justify-content: center;
            position: absolute;
            right: 25px;
            bottom: 15px;
            width: 85px;
            height: 28px;
            padding: 4px 10px;
            box-sizing: border-box;
            border-radius: 6px;
            border: 2px solid rgba(153, 115, 91, 0.4);
            letter-spacing: 2px;
            font-size: 14px;
            color: rgba(153, 115, 91, 0.5);
            cursor: pointer;
            box-shadow: 0 3px 10px -5px #888;
            transition: all .3s;
            .send {
                margin: 1px 0 0 4px;
            }
            &:hover {
                color: #efefef;
                background-color: rgba(153, 115, 91, 0.5);
            }
        }
    }
`

const EditArea = () => {
    const [ content, setContent ] = useState('');
    return (
        <div className='edit-area'>
            <div className='tools-bar'>
                <i className='iconfont icon'>&#xe827;</i>
                <i className='iconfont icon'>&#xe646;</i>
                <i className='iconfont icon'>&#xe610;</i>
            </div>
            <textarea className='txt-area' onChange={(e) => setContent(e.target.value)}></textarea>
            <div className='send-msg'>
                <span>发送</span>
                <i className='iconfont send'>&#xe613;</i>
            </div>
        </div>
    )
};

export default EditArea;