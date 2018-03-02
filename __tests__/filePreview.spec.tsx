import * as React from 'react';
import {shallow} from 'enzyme';
import FilePreview from '../src';

describe('FilePreview', () => {
  const setup = () => {
    const file = {} as File;
    const createObjectURL = jest.fn().mockReturnValue('some-preview');
    const revokeObjectURL = jest.fn(); 

    (global as any).URL = {
      createObjectURL,
      revokeObjectURL
    };  

    return {
      file,
      createObjectURL,
      revokeObjectURL
    };
  };
  
  it('should render the children component passing the preview', () => {
    const {file, createObjectURL} = setup();
    const component = shallow(
      <FilePreview file={file} >
        {(preview) => <img src={preview} />}
      </FilePreview>
    );

    expect(createObjectURL).toBeCalledWith(file);
    expect(component.find('img').prop('src')).toEqual('some-preview');
  });

  it('should generate a new preview when file prop changes', () => {
    const {file, createObjectURL, revokeObjectURL} = setup();
    const newFile = {} as File;
    const component = shallow(
      <FilePreview file={file} >
        {() => <div />}
      </FilePreview>
    );

    component.setProps({file: newFile});

    expect(revokeObjectURL).toHaveBeenCalledTimes(1);
    expect(createObjectURL).toHaveBeenCalledTimes(2);
    expect(revokeObjectURL).toBeCalledWith('some-preview');
    expect(createObjectURL.mock.calls[0][0]).toEqual(file);
    expect(createObjectURL.mock.calls[1][0]).toEqual(newFile);
  });

  it('should revoke url when component is unmounted', () => {
    const {file, createObjectURL, revokeObjectURL} = setup();
    const component = shallow(
      <FilePreview file={file} >
        {() => <div />}
      </FilePreview>
    );

    component.unmount();

    expect(revokeObjectURL).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toBeCalledWith('some-preview');
  });
});