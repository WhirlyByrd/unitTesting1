import { render, screen, fireEvent } from "@testing-library/react";
import { logRoles } from "@testing-library/dom";
import App from "./App";

test('button has correct initial color and updates when clicked', () => {
  const { container } = render(<App />);
  logRoles(container); // console logs the roles

  //role is always preferred method to find an element for accessibility reasons

  //find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue'})

  //expect the background color to be red
  //using kabab case for backgroundColor to avoid a false positive
  expect(colorButton).toHaveStyle({"background-color": 'red'});

  //click button, import fireEvent from react testing library
  fireEvent.click(colorButton);

  //expect to have background color of blue
  expect(colorButton).toHaveStyle({"background-color": 'blue'});

  //expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  //check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue'} );
  expect(colorButton).toBeEnabled();

  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

})



