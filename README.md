# react-preview-file
> Efficient way of rendering an image preview from a File

# Installation

```
$ yarn add react-preview-file
```

# Motivation
- auto revoke
- efficient preview

# Usage

```
import FilePreview from 'react-preview-file';

class App extends React.Component {
  onInputChange = e => {
    const { currentTarget: { files } } = e;
    const file = files[0];

    this.setState({file});
  }

  render() {
    const {file} = this.state;

    return (
      <div>
        <input type="file" onChange={this.onChange} />
        <FilePreview file={file}>
          {(preview) => {
            <img src={preview} />
          }}
        </FilePreview>
      </div>
    )
  }
}

```

# API

* **file**: File
* **children**: (preview: string) => ReactNode

