import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import GridButtonComponent from '.';

const meta = {
  title: 'components/Button',
  component: GridButtonComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof GridButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridButton: Story = {
  args: {

  },
};
