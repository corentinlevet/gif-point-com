import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

test("Navbar component is rendered correctly", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  const gifPointComElement = getByText("GIF-point-com");

  expect(gifPointComElement).toBeInTheDocument();
});
