import * as React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from 'react-router-dom';

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
import MenuIcon from '@mui/icons-material/Menu';

import cls from './NavBar.module.scss';


const pages = [
    { name: 'Главная', path: '/' },
    { name: 'Добавить позицию', path: 'add' },
    { name: 'Все позиции', path: 'all' },
    { name: 'Статистика', path: 'stat' }
];


export const NavBar = ({auth}) => {
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

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (callback) => {
        setAnchorElUser(null);
        callback();
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    return (
        <AppBar position="static" sx={{backgroundColor: '#8481a5'}}>

            <Container maxWidth="xl">
                <Toolbar disableGutters >

                    {/*TODO mobile menu*/}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            MenuListProps={{
                                sx: {
                                    backgroundColor: '#e4e3ec',
                                }
                            }}
                        >
                            {pages.map(({ name, path }) => (
                                <MenuItem key={name} onClick={handleCloseNavMenu}>
                                    <NavLink
                                        to={path}
                                        className={cls.linkMob}
                                        style={({ isActive }) => {
                                            return {
                                                color: isActive ? 'red' : 'inherit',
                                            };
                                        }}>
                                        <Typography
                                            textAlign="center"
                                            variant="h6"
                                        >
                                            {name}
                                        </Typography>
                                    </NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/*/!*TODO full menu*!/*/}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        {pages.map(({ name, path }) => (
                            <Button
                                key={name}
                                size="large"
                                sx={{ my: 1, mx: 1, color: 'white', display: 'block', }}
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
