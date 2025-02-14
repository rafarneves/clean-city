'use client'
import { useState, useCallback, useContext } from 'react';
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Tooltip, Typography, Button, Avatar, Container } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LogoCleanCity from '../../assets/img/clean-city.svg';
import AvatarImage from '../../assets/img/avatar-menu.svg'
import { AuthContext } from '../../../context/AuthContext';

const drawerWidth = 240;
const navItems = [
  { id: 1, item: 'Início', link: '/' },
  { id: 2, item: 'Quem somos', link: '/quem-somos' },
  { id: 3, item: 'Nossas ações', link: '/nossas-acoes' },
  { id: 4, item: 'Quero participar', link: '/quero-participar' },
];

const validatePath = (pathname: any , link: string) => {
  if (link === '/' && pathname.localeCompare(link) === 0) return true
  if (pathname.includes(link) && link !== '/') return true 
  else return false
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { token, logout, isAuthenticated } = useContext(AuthContext);
  
  // Função para alternar o menu lateral
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);
  
  // Função para abrir o menu de opções
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  
  // Função para fechar o menu de opções
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Função para fechar o menu e realizar o logout
  const handleLogout = useCallback(() => {
    setAnchorEl(null);
    logout();
  }, [])

  const handleMenuItem = useCallback((item: string) => {
    setAnchorEl(null);
    router.push(item)
  }, [])

  const drawerContent = (
    <Box sx={{ textAlign: 'center' }}>
      <Link href="/">
        <Image src={LogoCleanCity} priority alt="Logo Clean City" width={200} height={67} />
      </Link>
      <Divider />
      <List>
        {navItems.map((item) => {
          if ((isAuthenticated && item.id !== 4) || !isAuthenticated) return (
            <Link href={item.link} key={item.id}>
              <ListItem key={item.id} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item.item} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        })}
        {isAuthenticated && (
          <Box>
            <Link href="/dados-pessoais">
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Alterar dados" />
                </ListItemButton>
              </ListItem>
            </Link>
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </ListItem>
          </Box>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" position="static" sx={{ boxShadow: 'none', backgroundColor: '#ffffff' }}>
        <Container sx={{ py: 0.75 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 0 }}>
            <IconButton aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ display: { md: 'none' }, mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link href="/">
                <Image src={LogoCleanCity} width={264} height={67} alt="Logo" priority />
              </Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              {navItems.map((item) => {
                if ((isAuthenticated && item.id !== 4) || !isAuthenticated) return (
                  <Link href={item.link} key={item.id}>
                    <Button
                      variant={validatePath(pathname, item.link) ? 'contained' : 'text'}
                      sx={{
                        color: validatePath(pathname, item.link) ? '' : '#35BD8E',
                        textTransform: 'none',
                        fontWeight: 700,
                        backgroundColor: validatePath(pathname, item.link) ? '#35BD8E' : '',
                      }}
                    >
                      {item.item}
                    </Button>
                  </Link>
                )
              })}
              {isAuthenticated && (
                <Tooltip title="Opções">
                  <IconButton onClick={handleClick} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={AvatarImage.src} />
                  </IconButton>
                </Tooltip>
              )}
              
              <Menu
                id="options-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                {isAuthenticated ? (
                  <Box>
                    <Link href="/dados-pessoais" onClick={handleClose}>
                      <MenuItem>Alterar dados</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Sair</MenuItem>
                  </Box>
                ) : (
                  <Box>
                    <MenuItem onClick={() => handleMenuItem('/quero-participar')}>Login/Cadastro</MenuItem>
                  </Box>
                )}
              </Menu>
            </Box>
          </Box>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;