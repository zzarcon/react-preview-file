import * as React from 'react';
import {Component} from 'react';
import FilePreview from '../src';

export interface AppState {
  isPreviewVisible: boolean;
  file?: File;
}

export default class App extends Component <{}, AppState> {
  state: AppState = {
    isPreviewVisible: true
  }

  onChange = (e: any) => {
    const { currentTarget: { files } } = e;
    const file = files[0];

    this.setState({file});
  }

  onToggle = () => {
    this.setState({isPreviewVisible: !this.state.isPreviewVisible});
  }

  renderPreview() {
    const {file, isPreviewVisible} = this.state;
    if (!isPreviewVisible || !file) return;

    return (
      <FilePreview file={file}>
        {(preview) => 
          <img src={preview} />
        }
      </FilePreview>
    );
  }

  render() {
    return (
      <div>
        <input id="browse" type="file" onChange={this.onChange} />
        <button onClick={this.onToggle}>Toggle image</button>
        <br/>
        {this.renderPreview()}
      </div>
    )
  }
}