# Web Benchmark một số web framework khác nhau
1. Gogin
2. Echo Labstack
[https://github.com/labstack/echo](https://github.com/labstack/echo)
3. Iris
4. Fiber
5. Flask
6. Sanic
7. Node.js Express
8. ASP.net Core 3.1

## Để chạy Sanic và Flask
Cài đặt Python 3.7.x

```
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt

```
## ASP.net Core 3.1

```
$ cd asp_net_core 
$ dotnet build --configuration Release
$ cd bin/Release/netcoreapp3.1
$ ./asp_net_core
```

## Kết quả
|    | Web Framework      | req/sec | req/sec | req/sec | req/sec | reg/sec | Lỗi                                            |
|----|--------------------|---------|---------|---------|---------|---------|------------------------------------------------|
| 1  | ASP.net Core 3.1   | 42,706  | 41,492  | 44,182  | 43,411  | 9,000   | thỉnh thoảng có lỗi                            |
| 2  | Fiber Golang       | 46,989  | 47,128  | 46,717  | 46209   | 45,760  | thỉnh thoảng lỗi, chưa ổn định                 |
| 3  | Gogin Golang       | 39,080  | 41,662  | 41,166  | 42,123  | 42,184  | Ổn định                                        |
| 4  | Iris Golang        | 40,952  | 41,680  | 41,793  | 41,703  | 41,805  | Ổn định                                        |
| 5  | Echo Labstack      | 41,074  | 42,429  | 41,707  | 42,043  | 41,753  | Ổn định                                        |
| 6  | Plain Go           | 35,240  | 35,090  | 35,409  | 34,945  | 34,979  | Ổn định                                        |
| 7  | Node.js plain      | 16,933  | 8,861   | 8,895   | 16,882  | 8,632   | Lỗi nhiều                                      |
| 8  | Express Singlecore | 12,553  | 12,456  | 12,879  | 12,698  | 12,895  | Lỗi nhiều                                      |
| 9  | Express Multicore  | 25,278  | 29,540  | 31,068  | 30,814  | 31,045  | Ổn định                                        |
| 10 | Sanic Python       | 8,593   | 8,748   | 8,436   | 9,027   | 8,529   | Client.Timeout exceeded while awaiting headers |
| 11 | Flask Python       | 342     | 400     |         |         |         | Chán không buồn test, quá chậm !               |