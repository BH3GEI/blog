### FRP Configuration Guide

#### Server Configuration (frps.ini)
```shell
[common]
bind_port = 7000
token=xxx

#dashboard_port = 7500
#dashboard_user=root
#dashboard_pws=123456
```

#### Client Configuration (frpc.ini)
```shell
[common]
server_addr = xxx
server_port = 7000
token = xxx

[rdclient]
type = tcp
local_ip = 127.0.0.1
local_port = 3389
remote_port = 3389

[nessus]
type = tcp
local_ip = 127.0.0.1
local_port = 8834
remote_port = 8834

[vscode]
type = tcp
local_ip = 127.0.0.1
local_port = 8080
remote_port = 8080

[moonlight-tcp-1]
type = tcp
local_ip = 127.0.0.1
local_port = 47984
remote_port = 47984

[moonlight-tcp-2]
type = tcp
local_ip = 127.0.0.1
local_port = 47989
remote_port = 47989

[moonlight-tcp-3]
type = tcp
local_ip = 127.0.0.1
local_port = 48010
remote_port = 48010

[moonlight-udp-1]
type = udp
local_ip = 127.0.0.1
local_port = 5353
remote_port = 5353

[moonlight-udp-2]
type = udp
local_ip = 127.0.0.1
local_port = 47998
remote_port = 47998

[moonlight-udp-3]
type = udp
local_ip = 127.0.0.1
local_port = 47999
remote_port = 47999

[moonlight-udp-4]
type = udp
local_ip = 127.0.0.1
local_port = 48000
remote_port = 48000

[moonlight-udp-5]
type = udp
local_ip = 127.0.0.1
local_port = 48002
remote_port = 48002

[moonlight-udp-6]
type = udp
local_ip = 127.0.0.1
local_port = 48010
remote_port = 48010

#[smb]
#type = tcp
#local_ip = 127.0.0.1
#local_port = 445
#remote_port = 7002

#[ssh]
#type = tcp
#local_ip = 127.0.0.1
#local_port = 22
#remote_port = 6000
```

#### Adding Service on Server
```shell
nano /etc/systemd/system/frp.service
```

```shell
[Unit]
Description=frp service
After=network.target

[Service]
Type=simple
User=root
ExecStart=/root/frp/frps -c /root/frp/frps.ini
Restart=on-failure # or always, on-abort, etc

[Install]
WantedBy=multi-user.target
```

```shell
systemctl daemon-reload
systemctl enable frp     
systemctl start frp      
systemctl status frp     
systemctl restart frp    
```

#### Windows Auto-start Configuration
```shell
if "%1"=="hide" goto CmdBegin
start mshta vbscript:createobject("wscript.shell").run("""%~0"" hide",0)(window.close)&&exit
:CmdBegin
frpc -c frpc.ini &
```

---

### FRP配置说明

#### 服务端配置 (frps.ini)
```shell
[common]
bind_port = 7000
token=xxx

#dashboard_port = 7500
#dashboard_user=root
#dashboard_pws=123456
```

#### 客户端配置 (frpc.ini)
```shell
[common]
server_addr = xxx
server_port = 7000
token = xxx

[rdclient]
type = tcp
local_ip = 127.0.0.1
local_port = 3389
remote_port = 3389

[nessus]
type = tcp
local_ip = 127.0.0.1
local_port = 8834
remote_port = 8834

[vscode]
type = tcp
local_ip = 127.0.0.1
local_port = 8080
remote_port = 8080

[moonlight-tcp-1]
type = tcp
local_ip = 127.0.0.1
local_port = 47984
remote_port = 47984

[moonlight-tcp-2]
type = tcp
local_ip = 127.0.0.1
local_port = 47989
remote_port = 47989

[moonlight-tcp-3]
type = tcp
local_ip = 127.0.0.1
local_port = 48010
remote_port = 48010

[moonlight-udp-1]
type = udp
local_ip = 127.0.0.1
local_port = 5353
remote_port = 5353

[moonlight-udp-2]
type = udp
local_ip = 127.0.0.1
local_port = 47998
remote_port = 47998

[moonlight-udp-3]
type = udp
local_ip = 127.0.0.1
local_port = 47999
remote_port = 47999

[moonlight-udp-4]
type = udp
local_ip = 127.0.0.1
local_port = 48000
remote_port = 48000

[moonlight-udp-5]
type = udp
local_ip = 127.0.0.1
local_port = 48002
remote_port = 48002

[moonlight-udp-6]
type = udp
local_ip = 127.0.0.1
local_port = 48010
remote_port = 48010

#[smb]
#type = tcp
#local_ip = 127.0.0.1
#local_port = 445
#remote_port = 7002

#[ssh]
#type = tcp
#local_ip = 127.0.0.1
#local_port = 22
#remote_port = 6000
```

#### 服务端添加服务
```shell
nano /etc/systemd/system/frp.service
```

```shell
[Unit]
Description=frp service
After=network.target

[Service]
Type=simple
User=root
ExecStart=/root/frp/frps -c /root/frp/frps.ini
Restart=on-failure # or always, on-abort, etc

[Install]
WantedBy=multi-user.target
```

```shell
systemctl daemon-reload
systemctl enable frp     
systemctl start frp      
systemctl status frp     
systemctl restart frp    
```

#### Windows开机自启配置
```shell
if "%1"=="hide" goto CmdBegin
start mshta vbscript:createobject("wscript.shell").run("""%~0"" hide",0)(window.close)&&exit
:CmdBegin
frpc -c frpc.ini &
