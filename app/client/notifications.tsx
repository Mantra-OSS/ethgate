'use client';
import { Close } from '@mui/icons-material';
import { Alert, Button, IconButton, Snackbar, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { notificationsState } from '../viewer';

export function AppFrameNotifications() {
  const notifications = useRecoilValue(notificationsState);
  // const [open, setOpen] = useState(initialState)<boolean>(false);

  const handleClose = () => {
    // setState({
    //   ...state,
    //   open: false,
    // });
  };

  return (
    <>
      {notifications.map((notification, id) => (
        <Snackbar
          key={id}
          open={true}
          onClose={handleClose}
          // TODO: Make this work
          action={
            <>
              <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <Close fontSize="small" />
              </IconButton>
            </>
          }
        >
          {(() => {
            switch (notification.type) {
              case 'alert': {
                switch (notification.severity) {
                  case 'error': {
                    return (
                      <Alert severity="error">
                        {/* TODO: Translation */}
                        <Typography>An application error occurred:</Typography>
                        <code>{notification.error.message}</code>
                      </Alert>
                    );
                  }
                  case 'warning': {
                    return <Alert severity="warning">{notification.message}</Alert>;
                  }
                  case 'info': {
                    return <Alert severity="info">{notification.message}</Alert>;
                  }
                  case 'success': {
                    return <Alert severity="success">{notification.message}</Alert>;
                  }
                }
              }
            }
          })()}
        </Snackbar>
      ))}
    </>
  );
}

// export function AppFrameNotification({ notification }: { notification: Notification }) {
//   const handleClose = () => {
//     // setState({
//     //   ...state,
//     //   open: false,
//     // });
//   };

//   const action = (
//     <>
//       <Button color="secondary" size="small" onClick={handleClose}>
//         UNDO
//       </Button>
//       <IconButton
//         size="small"
//         aria-label="close"
//         color="inherit"
//         onClick={handleClose}
//       >
//         <Close fontSize="small" />
//       </IconButton>
//     </>
//   );

//   return (
//     <>
//       {notifications.map((notification, id) => (
//         <Snackbar key={id} open={true} onClose={handleClose}>
//           {(() => {
//             switch (notification.type) {
//               case 'alert': {
//                 switch (notification.severity) {
//                   case 'error': {
//                     return <Alert severity="error">{notification.error.message}</Alert>;
//                   }
//                   case 'warning': {
//                     return <Alert severity="warning">{notification.message}</Alert>;
//                   }
//                   case 'info': {
//                     return <Alert severity="info">{notification.message}</Alert>;
//                   }
//                   case 'success': {
//                     return <Alert severity="success">{notification.message}</Alert>;
//                   }
//                 }
//               }
//             }
//           })()}
//         </Snackbar>
//       ))}
//     </>
//   );
// }
