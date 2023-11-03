import { describe, expect, it } from 'vitest';

import { render, screen } from '../test-utils.js';

import App from './App.js';

describe.skip('<App>', () => {
  it('renders HomePage by default', async () => {
    await render(<App />);
    await screen.findByTestId('HomePage.container', {}, { timeout: 10000 });
    expect(screen.getByText('Any chain, real-time, all at once.')).toBeInTheDocument();
  });
  it('renders a <SkipNavLink> as first child', async () => {
    await render(<App />);
    const firstChild = document.querySelector('#root > :first-child');
    expect(firstChild).toHaveAttribute('href', '#chakra-skip-nav');
    expect(firstChild).toHaveTextContent('Skip to content');
  });
});
