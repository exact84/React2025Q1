import { vi } from 'vitest';
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe('main.tsx', () => {
  let rootElement: HTMLDivElement;

  beforeEach(() => {
    vi.clearAllMocks();
    rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
  });

  afterEach(() => {
    document.body.removeChild(rootElement);
  });

  // it('renders App inside StrictMode and BrowserRouter', async () => {
  //   await import('./main');

  //   expect(createRoot).toHaveBeenCalledWith(rootElement);

  //   const rootInstance = (createRoot as vi.Mock).mock.results[0]?.value;
  //   expect(rootInstance).toBeDefined();

  //   expect(rootInstance.render).toHaveBeenCalled();

  //   const renderCall = rootInstance.render.mock.calls[0][0];
  //   expect(renderCall.type).toBe(StrictMode);
  //   expect(renderCall.props.children.type).toBe(BrowserRouter);
  //   expect(renderCall.props.children.props.children.type).toBe(App);
  // });

  // it('passes the correct basename to BrowserRouter', async () => {
  //   import.meta.env.BASE_URL = '/my-app/';

  //   await import('./main');

  //   expect(createRoot).toHaveBeenCalled();

  //   const rootInstance = (createRoot as vi.Mock).mock.results[0]?.value;
  //   expect(rootInstance).toBeDefined();

  //   expect(rootInstance.render).toHaveBeenCalled();

  //   const renderCall = rootInstance.render.mock.calls[0][0];
  //   expect(renderCall.props.children.props.basename).toBe('/my-app/');
  // });
});
