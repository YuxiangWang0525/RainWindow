# RainWindow

> 一個輕量級訂閱制圖片發佈與瀏覽工具

[简体中文(中国内地)](README_CN.md) [English](README.md)

## 這是甚麼？

RainWindow 是一個為攝影師及其他需要管理訂閱制內容發佈的人士所設計的圖片發佈及瀏覽平台。

## 如何使用？

RainWindow 採用前後端分離的架構。您需要分別部署前端與後端。

以下是以 Nginx 為例的部署步驟：

### 前端部分

> 需要安裝 Node.js 及 Yarn 包管理器。

```shell
cd ./frontend
yarn install
yarn build
```

該命令會在 `dist` 目錄下生成前端靜態資源檔案。

請將該目錄下的內容複製到 Nginx 的 `www` 目錄中。

### 後端部分

> 需要安裝 Python 3.10 或更高版本。

將 `backend` 文件夾複製到合適的位置。

執行以下指令：

```shell
pip install -r requirements.txt
python app.py
```

程式將會在埠口 `25020` 上運行。

如果您想更改埠口號，請修改以下程式碼：

```python
app.run(host="0.0.0.0", port=<PORT>, debug=True)  # 在此修改埠口號。
```

### 最後一步：配置 Nginx

建立 `nginx.conf` 檔案，並加入以下設定：

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

### 幹得好！

如果整個過程中沒有出現錯誤，RainWindow 應該已經可以正常運作。

## 開源協議

RainWindow 根據 Apache 授權協議發佈。
