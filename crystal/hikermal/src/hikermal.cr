# TODO: Write documentation for `Hikermal`
require "kemal"
get "/" do
 "Hello World!"
end
Kemal.config.port = 9001
Kemal.config.logging = false
Kemal.run