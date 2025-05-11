# RainWindow

> A lightweight subscription picture publisher and viewer

[简体中文(中国大陆)](README_CN.md) [繁體中文(中國香港)](README_HK.md)

## What is it?

RainWindow is a lightweight subscription-based image publishing and viewing platform designed for photographers and individuals who need to manage subscription-based content.

## How to use it?

RainWindow is built as a frontend and backend separated service. You need to deploy the frontend and backend separately.

The following example uses Nginx:

### The Frontend

> You need Node.js and Yarn package manager.

```shell
cd ./frontend
yarn install
yarn build
```

This will generate static files in the `dist` directory.

Copy the contents of this folder to Nginx's `www` directory.

### The Backend

> You need Python 3.10 or higher installed.

Copy the `backend` directory to your desired location.

Run the following commands:

```shell
pip install -r requirements.txt
python app.py
```

The application should start running on port `25020`.

If you want to change the port, edit the following line in the code:

```python
app.run(host="0.0.0.0", port=<PORT>, debug=True)  # Modify the port number here.
```

### Final Step: Configure Nginx

Create an `nginx.conf` file with the following configuration:

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

### Done!

If no errors occurred during deployment, RainWindow should now be running properly.

## License

RainWindow is released under the Apache License.
