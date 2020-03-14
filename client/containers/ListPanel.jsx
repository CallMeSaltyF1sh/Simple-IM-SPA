import React, { useState } from 'react';
import { css } from 'astroturf';

const styles = css`
    .list-panel {
        position: relative;
        width: 270px;
        height: 100%;
        background: rgba(255,255,255,0.3);
        .list-panel-top {
            display: flex;
            flex-direction: row;
            position: relative;
            width: 100%;
            height: 50px;
            background-color: rgba(252,210,118,0.4);
            box-shadow: 0 1px 10px -6px #888;
            .list-panel-search {
                position: absolute;
                width: 75%;
                height: 32px;
                margin: 9px 0 0 5%;
                padding-left: 3px;
                border-radius: 20px;
                border: 0;
                outline: none;
                background-color: rgba(250,250,250,0.45);
                color: #bbb;
                font-size: 14px;
            }
        }
    }
`;

function ListPanel() {
    const [ searchTxt, setSearchTxt ] = useState('');
    return (
        <div className='list-panel'>
            <div className='list-panel-top'>
                <input 
                    type='text' 
                    value={searchTxt} 
                    className='list-panel-search' 
                    onChange={(e) => setSearchTxt(e.target.value)}
                    placeholder='搜索联系人或群组'
                />

            </div>
        </div>
    )
}

export default ListPanel;
