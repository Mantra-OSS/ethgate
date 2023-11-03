"use client";
import { Close } from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Suspense } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilValue } from "recoil";

import { notificationsState } from "../viewer";
import AppBarContent from "../components/AppBarContent";
import AppFooter from "../components/AppFooter";
import AppProvider from "../components/App";

export default function ExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <Stack style={{ minHeight: "100vh" }}>
        {/* <AppFrameNotifications /> */}
        <AppBar position="sticky">
          <AppBarContent />
          <Alert severity="warning">
            This is a beta! Send feedback here: [insert google forms link here]
          </Alert>
        </AppBar>
        <ErrorBoundary FallbackComponent={ErrorFallbackView}>
          <Suspense fallback={<SuspenseFallbackView />}>{children}</Suspense>
        </ErrorBoundary>
      </Stack>
      <AppFooter />
    </AppProvider>
  );
}

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
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <Close fontSize="small" />
              </IconButton>
            </>
          }
        >
          {(() => {
            switch (notification.type) {
              case "alert": {
                switch (notification.severity) {
                  case "error": {
                    return (
                      <Alert severity="error">
                        {/* TODO: Translation */}
                        <Typography>An application error occurred:</Typography>
                        <code>{notification.error.message}</code>
                      </Alert>
                    );
                  }
                  case "warning": {
                    return (
                      <Alert severity="warning">{notification.message}</Alert>
                    );
                  }
                  case "info": {
                    return (
                      <Alert severity="info">{notification.message}</Alert>
                    );
                  }
                  case "success": {
                    return (
                      <Alert severity="success">{notification.message}</Alert>
                    );
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

function ErrorFallbackView({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <AppFrameFallbackContainer>
      <Typography>Error: {error.message}</Typography>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </AppFrameFallbackContainer>
  );
}

function SuspenseFallbackView() {
  return (
    <AppFrameFallbackContainer>
      <CircularProgress />
    </AppFrameFallbackContainer>
  );
}

function AppFrameFallbackContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      style={{ textAlign: "center", marginTop: "auto", marginBottom: "auto" }}
    >
      {children}
    </Container>
  );
}
