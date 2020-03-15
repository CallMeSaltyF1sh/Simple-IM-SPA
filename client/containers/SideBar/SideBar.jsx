import React from 'react';
import { css } from 'astroturf';

const styles = css`
    .side-bar {
        position: relative;
        width: 96px;
        min-width: 96px;
        max-width: 96px;
        height: 100%;
        background-color: rgba(252,210,118,0.75);
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        box-shadow: 5px 0px 10px -5px #888;
        .avator {
            position: absolute;
            width: 62px;
            height: 62px;
            margin: 30px 0 0 17px;
            background-image: url('../../assets/images/avators/lei.jpg');
            background-size: 100% 100%;
            box-sizing: border-box;
            border-radius: 50%;
            cursor: pointer;
        }
        .icon-list {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-top: 193px;
            cursor: pointer;
        }
        .icon-list-item {
            width: 100%;
            height: 55px;
            padding-top: 11px;
            box-sizing: border-box;
            text-align: center;
            transition: all 0.3s;
            &:hover {
                background-color: rgba(208,181,166,0.5);
            }
            .icon {
                font-size: 30px;
                color: #b57c5c;
            }
        }
    }
`;

const iconList = [
    {
        id: 0,
        desc: '消息',
        unicode: '&#xe603;'
    },
    {
        id: 1,
        desc: '好友',
        unicode: '&#xe651;'
    },
    {
        id: 2,
        desc: '群聊',
        unicode: '&#xe69f;'
    },
    {
        id: 3,
        desc: '设置',
        unicode: '&#xe660;'
    }, 
    {
        id: 4,
        desc: '退出',
        unicode: '&#xe89c;'
    }
];

function SideBar() {
    return (
        <div className='side-bar'>
            <div className='avator'></div>
            <div className='icon-list'>
                {
                    iconList.map(item => (
                        <div className='icon-list-item' key={item.id}>
                            <i className='iconfont icon' dangerouslySetInnerHTML={{ __html: item.unicode}}></i>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar;
