import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Typography } from '@mui/material';
import HomeIcon from '../../assets/images/HomeIcon.png';

const Header = () => {
    return (
       <Box >
            <div className="Header" style={{width: 1512, height: 135, position: 'relative'}}>
                <div className="HeaderBg" style={{width: 1512, height: 135, left: 0, top: 0, position: 'absolute', background: '#252525'}} />
                <div className="HomeIcon" style={{width: 60, height: 60, left: 45, top: 37, position: 'absolute'}}>
                    <img src={HomeIcon} alt="Home Icon" style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="HeaderText" style={{width: 397, height: 32, left: 1001, top: 51, position: 'absolute'}}>
                    <div className="About" style={{width: 93, height: 32, left: 304, top: 0, position: 'absolute', color: 'white', fontSize: 30, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>About</div>
                    <div className="Home" style={{width: 93, height: 32, left: 0, top: 0, position: 'absolute', color: 'white', fontSize: 30, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Home</div>
                    <div className="Contact" style={{width: 119, height: 32, left: 139, top: 0, position: 'absolute', color: 'white', fontSize: 30, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Contact</div>
                </div>
            </div>
       </Box>
    );
    }

export default Header