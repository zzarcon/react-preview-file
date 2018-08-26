# react-preview-file
> Efficient way of rendering an image preview from a File

# Installation

```
$ yarn add react-preview-file
```

# Usage

**simple**

```javascript
import FilePreview from 'react-preview-file';

render() {
  const file = new File(['someBase64'], 'me.png');
  return (
    <FilePreview file={file}>
      {(preview) => <img src={preview} />}
    </FilePreview>
  )
}

```

**full**

```javascript
import FilePreview from 'react-preview-file';

class App extends React.Component {
  onInputChange = e => {
    const { currentTarget: { files } } = e;

    this.setState({files[0]});
  }

  render() {
    const {file} = this.state;

    return (
      <div>
        <input type="file" onChange={this.onChange} />
        <FilePreview file={file}>
          {(preview) => <img src={preview} />}
        </FilePreview>
      </div>
    )
  }
}

```

# API

* **file**: [File](https://developer.mozilla.org/en-US/docs/Web/API/File)
* **children**: (preview: string) => ReactNode

# Motivation
- Avoid multiple re-renders: **FilePreview** uses [URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) instead of [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader), the first one happens asynchronously and avoids dealing with state and multiple re-renders 👁
- Automatically revoke: **FilePreview** takes care for you of [revoke](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL) the created preview. This makes memory usage as efficient as possible 🔥
- Efficient preview generation: Not only **createObjectURL** is faster than [FileReader.readAsDataURL](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL) byt it also produces fixed length strings, instead of massive base64 strings ⚡️



