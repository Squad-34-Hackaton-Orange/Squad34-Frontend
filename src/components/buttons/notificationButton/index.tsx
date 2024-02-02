'use client'
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Zoom, useTheme } from '@mui/material';
import { NotificationsActive, Notifications } from '@mui/icons-material';
import React, { useState } from 'react'

const NotificationButton = () => {

  const theme = useTheme()

  const [animation, setAnimation] = useState(true)

  // CAL INFO FROM USER CONTEXT
  // const user = useContext();
  const notification = 0 // AQUI VAI FICAR AS NOTIFICAÇÕES NO USUÁRIO

  // HANDLE FUNCTIONALLITY OF THE BUTTON
  const [state, setState] = useState(false);

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(open);
    };

  const list = () => (
    <Box
      sx={{ width: '250px' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {/* COLOCAR AQUI O MAP DAS NOTIFICAÇÕES */}
        {['Notificação 1', 'Notificação 2', 'Notificação 3'].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{
              padding: 0,
              minWidth: 'auto'
            }}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'right'}>
        <Button onClick={toggleDrawer(true)} sx={{
          padding: 0,
          minWidth: 'auto'
        }}>
          <ListItemIcon sx={{
            padding: 0,
            minWidth: 'auto',
            color: 'white'
          }}>
            {notification > 0 ? <Zoom in={notification > 0}>
              <NotificationsActive sx={{ width: 24, height: 24, color: theme.colors.alert100 }} />
            </Zoom> : <Notifications sx={{ width: 24, height: 24 }} />}
          </ListItemIcon>
        </Button>
        <Drawer
          anchor={'right'}
          open={state}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
export default NotificationButton