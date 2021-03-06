import React, { useState, memo, forwardRef } from 'react';
import { css } from 'astroturf';

const styles = css `
    .search-box {
        display: flex;
        flex-direction: row;
        position: relative;
        width: 77%;
        height: 32px;
        margin: 9px 0 0 5%;
        border-radius: 20px;
        .search-icon {
            margin: 8px 0 0 8px;
            color: #ccc;
            z-index: 5;
        }
        .search-box-input {
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 0 25px 0 30px;
            box-sizing: border-box;
            border-radius: 20px;
            border: 0;
            outline: none;
            background-color: rgba(250,250,250,0.45);
            color: #999;
            font-size: 14px;
            &::-webkit-input-placeholder {
                color: #999;
            }
            &::-moz-placeholder {
                color: #999;
            },
            &:-moz-placeholder {
                color: #999;
            },
            &:-ms-input-placeholder {
                color: #999;
            }
            &::-ms-clear {
                display: none;
            }
        }
        .delete-icon {
            position: absolute;
            top: 9px;
            right: 6px;
            z-index: 999;
            color: #bbb;
            font-size: 14px;
            cursor: pointer;
        } 
    }
`

const SearchBox = forwardRef((props, ref) => {
    const [ searchTxt, setSearchTxt ] = useState('');
    const [ deleteDisplay, setDeleteDisplay ] = useState('none');

    const handleChange = e => {
        setSearchTxt(e.target.value);
    };
    const handleInput = e => {
        setDeleteDisplay('initial');
    };
    const handleBlur = e => {
        if(!searchTxt) {
            setDeleteDisplay('none');
        }
    };
    const handleDelete = e => {
        setSearchTxt('');
        setDeleteDisplay('none');
    };

    return (
        <div className='search-box'>
            <i className='iconfont search-icon'>&#xe61f;</i>
            <input 
                type='text' 
                value={searchTxt} 
                className='search-box-input' 
                onChange={handleChange}
                onInput={handleInput}
                onBlur={handleBlur}
                ref={ref}
                placeholder='搜索联系人或群组'
            />
            <i 
                className='iconfont delete-icon' 
                style={{display:deleteDisplay}}
                onClick={handleDelete}
            >
               &#xe668;
            </i>
        </div>
    )
});

export default SearchBox;