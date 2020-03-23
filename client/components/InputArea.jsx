import React, { useState, forwardRef, memo } from 'react';
import { css } from 'astroturf';

const styles = css`
    .input-area {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 10px;
        .input-box {
            display: flex;
            flex-direction: row;
            position: relative;
            width: 100%;
            height: 32px;
            border-radius: 20px;
            .input-icon {
                margin: 8px 0 0 8px;
                color: #bf9c93;
                z-index: 5;
            }
            .input {
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
        }
        .tips {
            padding: 3px 8px 0 8px;
            box-sizing: border-box;
            font-size: 12px;
            color: #e0986b;
            width: 100%;
        }
    }
`

const InputArea = forwardRef((props, ref) => {
    const { unicode, checkValidity, passedTips, placeholder, type, style } = props;
    const [isOk, setIsOk] = useState(true);
    const [content, setContent] = useState('');
    const [tips, setTips] = useState('');

    const handleBlur = e => {
        if(checkValidity) {
            console.log(checkValidity(e.target.value))
            if(checkValidity(e.target.value)) {
                setIsOk(true);
                setTips('');
            } else {
                setIsOk(false);
                setTips(passedTips);
            }
        }
    };

    return (
        <div className='input-area'>
            <div className='input-box'>
                <i 
                    className='iconfont input-icon' 
                    dangerouslySetInnerHTML={{ __html: unicode }}
                ></i>
                <input 
                    type={type} 
                    value={content} 
                    ref={ref}
                    className='input' 
                    onChange={(e) => setContent(e.target.value)}
                    //onInput={handleInput}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    style={{...style}}
                />
            </div>
            <div 
                className='tips' 
                style={{ display: isOk ? 'none' : 'initial' }}
            >
                {tips}
            </div>
        </div>
    )
});

export default memo(InputArea);