# microservices-nest-kafka
belajar sambil ngingat aja 

# Make submodule as ordinary folder

```
git rm --cached service-name
rm -rf service-name/.git
```

# Protoc
```
protoc proto.proto --go_out=. --go-grpc_out=. --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative
```