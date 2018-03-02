# react-file-preview
> Efficient way of rendering an image preview from a File

# Installation

```
$ yarn add react-file-preview
```

# Motivation
- auto revoke
- efficient preview

# Usage

```
import FilePreview from 'react-file-preview';

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