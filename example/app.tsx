import * as React from 'react';
import {Component} from 'react';
import {GHCorner} from 'react-gh-corner';
import FilePreview from '../src';
import { AppWrapper, ImgPreview } from './styled';

export interface AppState {
  isPreviewVisible: boolean;
  file?: File;
}

const repoUrl = 'https://github.com/zzarcon/react-preview-file';

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
          <ImgPreview src={preview} />
        }
      </FilePreview>
    );
  }

  render() {
    return (
      <AppWrapper>
        <GHCorner openInNewTab href={repoUrl} />
        <input id="browse" type="file" onChange={this.onChange} />
        <button onClick={this.onToggle}>Toggle image</button>
        <br/>
        {this.renderPreview()}
      </AppWrapper>
    )
  }
}