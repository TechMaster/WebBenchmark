# TODO: Write documentation for `Hikermal`
require "kemal"
get "/" do
 "Hello World!"
end
Kemal.config.port = 8080
Kemal.config.logging = false
Kemal.run