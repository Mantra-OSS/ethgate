'use client';

import { List, ListItem } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import { FallbackBoundary } from './ui';

export function NodeList({ children }: { children: React.ReactNode }) {
  return (
    <List>
      <TransitionGroup>{children}</TransitionGroup>
    </List>
  );
}

export function NodeListItem({ children }: { children: React.ReactNode }) {
  return (
    <ListItem dense disablePadding>
      <FallbackBoundary>{children}</FallbackBoundary>
    </ListItem>
  );
}
