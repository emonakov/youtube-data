import ReactDOM from 'react-dom';
jest.mock('react-dom', ()=> ({render: jest.fn()}))

it('renders without crashing', () => {
  const div = document.createElement('div');
  div.setAttribute('id', 'root')
  global.document.body.appendChild(div)
  require('../index')
  expect(ReactDOM.render).toHaveBeenCalled()
});
