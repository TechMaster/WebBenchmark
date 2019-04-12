package main

import "github.com/kataras/iris"

func main() {
    app := iris.Default()
    app.Logger().SetLevel("error")
    app.Get("/", func(ctx iris.Context) {
        ctx.WriteString("Hello World!")
    })
    // listen and serve on http://0.0.0.0:8080.
    app.Run(iris.Addr(":8080"))
}