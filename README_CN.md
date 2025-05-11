# RainWindow

> 一个轻量级的订阅制图片发布与浏览工具

[繁體中文(中國香港)](README_HK.md) [English](README.md)

## 这是什么？

RainWindow 是一个为摄影师以及其他需要管理订阅制内容发布的人群所设计的图片发布和浏览平台。

## 如何使用？

RainWindow 是前后端分离的服务。你需要分别部署前端和后端。

以下是以 Nginx 为例的部署步骤：

### 前端部分

> 需要安装 Node.js 和 Yarn 包管理器。

```shell
cd ./frontend
yarn install
yarn build
```

该命令会在 `dist` 目录下生成前端静态资源文件。

将该目录下的内容复制到 Nginx 的 `www` 目录中。

### 后端部分

> 需要安装 Python 3.10 或更高版本。

将 `backend` 文件夹复制到合适的位置。

运行以下命令：

```shell
pip install -r requirements.txt
python app.py
```

程序将会在端口 `25020` 上运行。

如果你想更改端口号，请修改以下代码：

```python
app.run(host="0.0.0.0", port=<PORT>, debug=True)  # 在这里修改端口号。
```

### 最后一步：配置 Nginx

创建 `nginx.conf` 文件，并添加如下配置：

```nginx
server {
    listen 80;
    server_name example.com;

    location /api/ {
        proxy_pass http://localhost:<YOUR_PORT>/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_redirect off;
    }
}
```

### 完成！

如果中间没有发生错误，RainWindow 应该已经可以正常运行了。

## 开源协议

RainWindow 遵循 Apache 开源许可证发布。
