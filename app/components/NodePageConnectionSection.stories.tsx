import type { Meta, StoryObj } from '@storybook/react';

import { NodePageConnectionSection } from './NodePage';

const meta = {
  title: 'NodePageConnectionSection',
  component: NodePageConnectionSection,
  parameters: {},
  tags: ['autodocs'],
  // argTypes: {
  //   children: { control: 'color' },
  // },
} satisfies Meta<typeof NodePageConnectionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Empty: Story = {
  args: {
    title: 'Empty List',
    href: '#',
    children: <></>,
  },
};

function Suspender() {
  throw new Promise(() => {});
  return null;
}

export const Loading: Story = {
  args: {
    title: 'Loading List',
    href: '#',
    children: (
      <>
        <Suspender />
      </>
    ),
  },
};
