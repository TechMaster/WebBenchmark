# Web Benchmark một số web framework khác nhau
1. [Gogin](https://github.com/gin-gonic/gin)
2. [Echo Labstack](https://github.com/labstack/echo)
3. [Iris](https://github.com/kataras/iris)
4. [Fiber](https://github.com/gofiber/fiber)
5. [Flask](https://github.com/pallets/flask)
6. [Sanic](https://github.com/huge-success/sanic)
7. [Node.js Express](https://github.com/expressjs/express)
8. [ASP.net Core 3.x](https://github.com/dotnet/aspnetcore)

Người thực hiện Trịnh Minh Cường, bảo vệ tại [Techmaster Việt nam](https://techmaster.vn)

## Cấu hình máy test và công cụ test
Dell Workstation M6800, Core i7 M4800, GPU NVidia K3100, RAM 16GRAM, ổ cứng SSD

Công cụ benchmark [rakyll/hey](https://github.com/rakyll/hey)

Tất cả web server đều lập trình để lắng nghe ở cổng 8080, xuất ra duy nhất dòng chữ "Hello World!"

Lệnh benchmark đơn giản thôi, tạo ra 200,000 requests, mỗi lúc có 300 requests gửi đến server.

```
$ hey -n 200000 -c 300 http://localhost:8080
```

Các web server đều viết code tối giản, ngắn nhất, tối ưu nhất có thể

## Node.js có 3 loại
### Node thuần không dùng framework trong thư mục Node.
```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
### Express SingleCore
```javascript
const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port 
${port}!`))
```

### Express Nodes Cluster tận dụng MultiCore
```javascript
const express = require("express")
const os = require("os")
const cluster = require("cluster")
 
const PORT = process.env.PORT || 8080
 
const clusterWorkerSize = os.cpus().length
 
if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i=0; i < clusterWorkerSize; i++) {
      cluster.fork()
    }
 
    cluster.on("exit", function(worker) {
      console.log("Worker", worker.id, " has exitted.")
    })
  } else {
    const app = express()
    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(PORT, function () {
      console.log(`Express server listening on port ${PORT} and worker ${process.pid}`)
    })
  }
} else {
  const app = express()
  app.get('/', (req, res) => res.send('Hello World!'))
  app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT} with the single worker ${process.pid}`)
  })
}
```

## Để chạy Sanic và Flask
Cài đặt Python 3.7.x trước, sau đó tạo Virtual Environment, và cài đặt sanic, flask

```
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt

```
Khi khởi động app Python nhớ kích hoạt Virtual Environment bằng lệnh
```
$ source venv/bin/activate
```
Sau đó chạy
```
$ python app.py
```

## ASP.net Core 3.1
Chạy file release sau khi build
```
$ cd asp_net_core 
$ dotnet build --configuration Release
$ cd bin/Release/netcoreapp3.1
$ ./asp_net_core
```

Mã nguồn ứng dụng ASP.net Core cũng tối giản nhất có thể
```csharp
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

public class Program
{
    public static void Main(string[] args) =>
        Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.Configure(app =>
            {
                app.UseRouting();
                app.UseEndpoints(route =>
                {
                    route.MapGet("/", context => context.Response.WriteAsync("Hello World!"));
                });
            }).UseUrls("http://0.0.0.0:8080");
        }).Build().Run();
}
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

### Kết luận

Các framework viết bằng Golang chịu tải tốt, phản hồi nhanh và ổn định. Nhiều web server sau khi khởi động lên, số lượng request đến cần phải tăng từ từ để web app làm quen dần. Nhưng web app Golang không cần như vậy.

Node.js chạy chế độ cluster có cải thiện hơn về khả năng chịu tải, nhưng vẫn kém hơn Golang Web.

ASP.net Core 3.x có cải tiến nhiều về tốc độ, hiệu năng. Nhưng code vẫn hết sức nhiêu khê.

Fiber Golang sử dụng FastHttp, tốc độ rất nhanh, nhưng lại không ổn định qua những lần kiểm thử.

Mình vẫn dùng Iris framework, đủ nhanh và ổn định. Tác giả fix bug nhiệt tình, hỗ trợ yêu cầu cũng tốt.

Các web framework viết bằng Python chạy khá chậm. Flask Python chỉ xử lý được khoảng 300-400 requests / sec. Phù hợp với những bạn dựng thử web app demo sản phẩm AI chứ ra production chắc chắn không được.

Sanic sử dụng cơ chế Event Loop giống với Node.js. Rõ ràng cải thiện hơn Flask nhiều lần, nhưng vẫn không đấu lại với Golang. Nếu cần triển khai ứng dụng AI giao diện web có thể dùng Sanic làm REST API.

