import React, { useState, useRef, memo } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import SearchBox from '@/components/SearchBox';
import DialogItem from '@/components/DialogItem';
import LinkmanItem from '@/components/LinkmanItem';
import { changeCGModalDisplay } from '../CreateGroupModal/store/actions';

const styles = css`
    .list-panel {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 270px;
        min-width: 255px;
        max-width: 270px;
        height: 100%;
        background: rgba(245,245,245,0.3);
        .list-panel-top {
            display: flex;
            flex-direction: row;
            position: relative;
            width: 100%;
            height: 50px;
            background-color: rgba(252,210,118,0.7);
            box-shadow: 0 6px 12px -10px #888;
            .add {
                margin: 14px 0 0 11px;
                color: #ceb5a3;
                font-size: 23px;
                cursor: pointer;
                transition: all .3s;
                &:hover {
                    color: #ad876e;
                }
            }
        }
        .chat-list-wrapper {
            flex: 1;
            overflow-y: auto;
            &::-webkit-scrollbar {
                width: 0;
            }
        }
    }
`;

//mock
const msgList = [
    {
        id: 0,
        type: 'multi',
        avatarUrl: '/assets/images/avators/1.png',
        name: 'test群',
        latestMsg: '啦啦啦emmmmmmmmmmm',
        msgTime: new Date(),
        unreadCnt: 20,
        focus: true
    },
    {
        id: 1,
        type: 'single',
        avatarUrl: '/assets/images/avators/2.jpg',
        name: '咸大猪',
        latestMsg: '咸猪冲鸭！',
        msgTime: new Date(),
        unreadCnt: 100
    },
    
];

const ListPanel = (props) => {
    const { list: immutableList, itemType } = props;
    const { changeCGModalDisplayDispatch } = props;
    const list = immutableList ? immutableList.toJS() : [];
    const Item = itemType === 'dialog' ? DialogItem : LinkmanItem;

    const handleAdd = () => {
        changeCGModalDisplayDispatch(true);
    };

    return (
        <div className='list-panel'>
            <div className='list-panel-top'>
                <SearchBox />
                <i className='iconfont add' onClick={handleAdd}>&#xe60b;</i>
            </div>
            <div className='chat-list-wrapper'>
                {
                    msgList.map(item => (
                        <div key={item.type + item.id}>
                            <Item {...item} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    list: state.getIn(['listPanel', 'list']),
    itemType: state.getIn(['listPanel', 'itemType'])
});

const mapDispatchToProps = dispatch => {
	return {
        changeCGModalDisplayDispatch(bool) {
            dispatch(changeCGModalDisplay(bool));
        }
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(ListPanel));
