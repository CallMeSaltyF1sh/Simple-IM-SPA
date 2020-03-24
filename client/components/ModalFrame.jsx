import React from 'react';
import { css } from 'astroturf';
import ModalMask from '@/components/ModalMask';
import Button from '@/components/Button';

const initialColor = '#bf9c93';
const hoverColor = '#a3857d';
const bgColor = '#edd39c';

const styles = css`
    .login-modal {
        position: absolute;
        width: 30%;
        top: 50%;
        left: 50%;
        padding: 30px 40px 36px 40px;
        box-sizing: border-box;
        border-radius: 30px;
        box-shadow: 0 3px 25px #888;
        background: ${bgColor};
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        transform:translate(-50%,-50%);
        .modal-top {
            width: 100%;
            margin-bottom: 15px;
            text-align: center;
            font-size: 26px;
            color: ${initialColor};
            letter-spacing: 1px;
        }
        .bottom-wrapper {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            .switch {
                color: ${initialColor};
                font-size: 15px;
                line-height: 32px;
                font-style: italic;
                cursor: pointer;
                transition: all .3s;
                &:hover {
                    color: ${hoverColor};
                }
            }
        }
        .close {
            position: absolute;
            top: 20px;
            right: 20px;
            color: ${initialColor};
            &:hover {
                color: ${hoverColor};
            }
        }
    }
`

const ModalFrame = (props) => {
    const { children, title, switchTxt, btnTxt } = props;
    const { onClose, onSwitch, onSubmit } = props;

    const handleClose = () => {
        onClose(false);
    };
    const handleSwitch = () => {
        onClose(false);
        onSwitch(true);
    };
    const handleSubmit = () => {
        onSubmit();
    };
    
    return (
        <ModalMask>
            <div className='login-modal'>
                <div className='modal-top'>{title}</div>
                {children}
                <div className='bottom-wrapper'>
                    {onSwitch && <div className='switch' onClick={handleSwitch}>> 去{switchTxt}~!</div>}
                    <Button 
                        btnTxt={btnTxt} 
                        handleClick={handleSubmit}
                        style={{ width: onSwitch ? '40%' : '100%', fontSize: 14, background: '#c4a79f' }}
                    />
                </div>
                <i className='iconfont close' onClick={handleClose}>&#xe612;</i>
            </div>
        </ModalMask>
    )
}

export default ModalFrame;