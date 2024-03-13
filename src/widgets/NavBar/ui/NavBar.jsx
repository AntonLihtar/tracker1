import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import cls from './NavBar.module.scss';
import { useContext } from "react";
import { Context } from "src/main.jsx";
import { useAuthState } from "react-firebase-hooks/auth";

const pages = [
    { name: 'Главная', path: '/' },
    { name: 'Все товары', path: 'all' },
    { name: 'Добавить товар', path: 'add' },
    { name: 'Статистика', path: 'stat' }];


export const NavBar = () => {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)

    const settings = [
        {
            name: 'Profile',
            callback: () => {
            }
        },
        {
            name: 'Logout',
            callback: () => {
                auth.signOut()
                console.log('ВЫ вышли из аккаунта')
            }
        },
    ];


    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (callback) => {
        setAnchorElUser(null);
        callback();
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        {pages.map(({ name, path }) => (
                            <Button
                                key={name}
                                size="large"
                                sx={{ my: 2, mx: 2, color: 'white', display: 'block', }}
                            >
                                <NavLink
                                    to={path}
                                    className={cls.link}
                                    style={({ isActive }) => {
                                        return {
                                            color: isActive ? 'red' : 'inherit',
                                        };
                                    }}>
                                    {name}
                                </NavLink>
                            </Button>
                        ))}
                    </Box>

                    <Box
                        display="flex"
                        gap={1}
                        fontSize={20}
                        alignItems="center"

                        sx={{ flexGrow: 0 }}>
                        {user.displayName}
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={user.photoURL}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            {settings.map(({ name, callback }) => (
                                <MenuItem key={name} onClick={() => handleCloseUserMenu(callback)}>
                                    <Typography textAlign="center">{name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
