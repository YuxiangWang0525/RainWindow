from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 数据库配置
db_config = {
    'user': 'rainwindow',
    'password': 'pyKJaz76bWrLcaSZ',
    'host': '47.242.231.12',
    'database': 'rainwindow'
}

def get_metadata_and_pictures(key):
    # 连接到MySQL数据库
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    # 获取元数据
    metadata_query = """
    SELECT `key`.elements, description, bgmurl, bgmart, bgmname, bgmcover 
    FROM `key` 
    INNER JOIN element_info ON `key`.elements=element_info.elements 
    WHERE `key`.`key`=%s
    """
    cursor.execute(metadata_query, (key,))
    metadata = cursor.fetchone()

    if not metadata:
        return None

    # 获取图片列表
    pictures_query = """
    SELECT pictureurl 
    FROM pictures 
    INNER JOIN `key` ON pictures.elements=`key`.elements 
    WHERE `key`.`key`=%s
    """
    cursor.execute(pictures_query, (key,))
    pictures = [row['pictureurl'] for row in cursor.fetchall()]

    # 关闭数据库连接
    cursor.close()
    conn.close()

    # 构建返回结果
    result = {
        **metadata,
        'pictures': pictures
    }
    return result

@app.route('/api/get_data', methods=['GET'])
def get_data():
    key = request.args.get('key')
    if not key:
        return jsonify({'error': 'Key parameter is required'}), 400

    data = get_metadata_and_pictures(key)
    if not data:
        return jsonify({'error': 'No data found for the given key'}), 404

    return jsonify(data)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=25020, debug=True)
    application = app