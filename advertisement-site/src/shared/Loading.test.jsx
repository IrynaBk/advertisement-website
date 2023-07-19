import React from 'react';
import { render } from '@testing-library/react';
import Loading from './Loading';

describe('Loading component', () => {
  it('renders loading animation', () => {
    const { getByTestId } = render(<Loading />);
    const loadingAnimation = getByTestId('loading-animation');
    
    expect(loadingAnimation).toBeInTheDocument();
    // You can also perform additional assertions if needed
    // For example, you can check the styling properties
    expect(loadingAnimation).toHaveStyle(`
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -50px;
      margin-left: -50px;
      width: 100px;
      height: 100px;
    `);
  });
});
