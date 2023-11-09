'use client';
import type { SolverNode } from '@/lib-solver';
import { type PageArgs, type SolverEdge } from '@/lib-solver';
import { use, useCallback, useEffect, useState } from 'react';

import type { Connection } from '../client/backend';
import { readConnection, readNode } from '../client/backend';

export const useNode = function useNode<T extends SolverNode>(id: T['id']): T {
  const node = use(readNode(id));
  return node;
};
