import requests
proxies = {
    "http": "socks5://127.0.0.1:1080",
    "https": "socks5://127.0.0.1:1080",
}
url = 'https://baidu.com/'
response = requests.post(url, proxies=proxies)
print(response.content)
