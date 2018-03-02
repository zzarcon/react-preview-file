import * as React from 'react';
import {Component, ReactNode} from 'react';

export interface FilePreviewProps {
  file: File;
  children: (preview: string) => ReactNode;
}

export class FilePreview extends Component <FilePreviewProps> {
  preview: string;

  componentWillReceiveProps({file: newFile}: FilePreviewProps) {
    const {file} = this.props;

    if (file !== newFile) {
      this.revoke();
      this.createPreview(newFile);
    }
  }

  componentWillMount() {
    const {file} = this.props;

    this.createPreview(file);
  }

  componentWillUnmount() {
    this.revoke();
  }

  private createPreview(file: File) {
    this.preview = URL.createObjectURL(file);
  }

  private revoke() {
    URL.revokeObjectURL(this.preview);
  }

  render() {
    const {children} = this.props;

    return children(this.preview);
  }
}

export default FilePreview;