import { render, screen, fireEvent } from "@testing-library/react";
import { logRoles } from "@testing-library/react";
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
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  expect(checkbox).not.toBeChecked();

});

test('when checkbox is checked, button should be disabled', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox');
  const colorButton = screen.getByRole('button');

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();

 
})

test('Check that button turns gray when disabled and red when enabled', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox');
  const colorButton = screen.getByRole('button');

  //disbale the button
  fireEvent.click(checkbox);

  //check that the button background is gray
  expect(colorButton).toHaveStyle({'background-color': 'gray'})

  //enable the button
  fireEvent.click(checkbox);

  //check that the button background is red
  expect(colorButton).toHaveStyle({'background-color': 'red'})

  //click button to change color
  fireEvent.click(colorButton);

  //disable the button
  fireEvent.click(checkbox);

  //check button is gray
  expect(colorButton).toHaveStyle({'background-color': 'gray'})

  //enable the button
  fireEvent.click(checkbox);

  //check button is blue
  expect(colorButton).toHaveStyle({'background-color': 'blue'})

})




