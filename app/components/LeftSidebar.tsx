import { Explore, Home, Message, Notifications, Person } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

const menuItems = [
  { label: 'Home', href: '/', icon: <Home /> },
  { label: 'Profile', href: '/profile', icon: <Person /> },
  { label: 'Explore', href: '/explore', icon: <Explore /> },
  { label: 'Messages', href: '/messages', icon: <Message /> },
  { label: 'Notifications', href: '/notifications', icon: <Notifications /> },
];

export default function LeftSidebar() {
  return (
    <Stack direction="column" padding={2} gap={2}>
      {menuItems.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </Stack>
  );
}

function MenuItem({ label, href, icon }: { label: string; href: string; icon: React.ReactNode }) {
  return (
    <Button href={href} color="inherit" startIcon={icon}>
      <Typography variant="h5">{label}</Typography>
    </Button>
  );
}
