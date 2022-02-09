<h1 align="center">
  <a href="https://upload.io/uploader">
    <img alt="Upload.js" width="276" height="80" src="https://raw.githubusercontent.com/upload-io/assets/master/logo-uploader.svg">
  </a>
</h1>

<p align="center"><b>File & Image Uploader Widget</b></p>
<br/>
<p align="center">
  <a href="https://github.com/uploader/uploader/">
    <img src="https://img.shields.io/badge/gzipped-7%20kb-75C46B" />
  </a>

  <a href="https://www.npmjs.com/package/uploader">
    <img src="https://img.shields.io/badge/uploader-npm-75C46B" />
  </a>

  <a href="https://github.com/uploader/uploader/actions/workflows/ci.yml">
    <img src="https://img.shields.io/badge/build-passing-75C46B" />
  </a>

  <a target="_blank" href="https://twitter.com/intent/tweet?text=A%20new%20way%20to%20upload%20files%3F%20I%20just%20found%20Uploader%20%E2%80%94%20it's%20a%20library%20and%20a%20SaaS%20%E2%80%94%20makes%20it%20super%20easy%20to%20add%20file%20uploads%20%26%20transformations%20into%20web%20apps%20%E2%80%94%20installs%20with%207%20lines%20of%20code%20https%3A%2F%2Fgithub.com%2Fupload-js%2Fuploader&hashtags=javascript,opensource,js,webdev,developers">
    <img alt="Twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fupload-js%2Fuploader%2F" />
  </a>

</p>

## ⚙️ Prerequisites

1.  [Create an Upload account](https://upload.io/) (it only takes a few seconds).

2.  Install Uploader:

    ```bash
    npm install uploader
    ```

    Or:

    ```html
    <script src="https://js.upload.io/uploader/v1"></script>
    ```

## 🎯 Features

Uploader is an HTML5 file & image uploader widget for [Upload.io](https://upload.io/uploader).

Use them together to get:

- File uploading that works out-the-box.
- File storage & file hosting. (Zero setup, pre-integrated.)
- Integrated CDN. (300+ locations, 47+ countries.)
- File processing. (Image resizing, cropping, etc.)
- File authorization. (Optional: issue JWTs from your app to define per-user file access.)
- Monitoring. (Beautiful dashboards to monitor usage & traffic.)
- And much more, [explore Upload.io](https://upload.io/features).

## 👀 Examples

```html
<html>
  <head>
    <script src="https://js.upload.io/uploader/v1"></script>
    <script>
      const uploader = new Uploader({

        // Replace with your API key. (Get from: https://upload.io/)
        apiKey: "..."

      });

      uploader.open({ multi: true }).then(
        files => {
          alert(`Files uploaded:\n${files.map(x => x.fileUrl).join("\n")}`);
        },
        e => console.error(e)
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

## Contribute

If you would like to contribute to Uploader:

1. Add a [GitHub Star](https://github.com/upload-js/uploader/stargazers) to the project (only if you're feeling generous!).
2. Determine whether you're raising a bug, feature request or question.
3. Raise your issue or PR. 🚀

## License

[MIT](LICENSE)
