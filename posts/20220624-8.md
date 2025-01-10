# Setting up a Minecraft Server on Ubuntu

This document outlines the process of setting up a Minecraft server on Ubuntu, including installing necessary software, configuring the server, and creating backup scripts.

## 1. Installing Required Software

First, we need to update the package list and install essential software.

```bash
sudo apt update
sudo apt install git build-essential -y
```

Next, we'll add Java's PPA and install Java 17.

```bash
sudo add-apt-repository ppa:linuxuprising/java 
sudo apt-get install oracle-java17-installer
java -version
```

## 2. Creating Minecraft User and Directory

Create a new system user to run the Minecraft server and set up necessary directories.

```bash
sudo useradd -r -m -U -d /opt/minecraft -s /bin/bash minecraft
sudo su - minecraft
mkdir -p ~/{backups,tools,server}
```

## 3. Installing mcrcon

mcrcon is a lightweight RCON client for remote connection to Minecraft servers.

```bash
git clone https://hub.fastgit.xyz/Tiiffi/mcrcon.git ~/tools/mcrcon 
cd ~/tools/mcrcon
gcc -std=gnu11 -pedantic -Wall -Wextra -O2 -s -o mcrcon mcrcon.c  #compile mcrcon
./mcrcon -v
```

## 4. Installing Minecraft Server

Download and run the Minecraft server.

```bash
wget https://launcher.mojang.com/v1/objects/e00c4052dac1d59a1188b2aa9d5a87113aaf1122/server.jar -P ~/server
cd ~/server
java -Xmx1024M -Xms1024M -jar server.jar nogui
```

## 5. Configuring Minecraft Server

Accept EULA and configure server properties.

```bash
nano ~/server/eula.txt
```
```plaintext
eula=true
```

```bash
nano ~/server/server.properties
```
```plaintext
rcon.port=25575
rcon.password=strong-password
enable-rcon=true
```

## 6. Creating and Starting Minecraft Service

Create a new systemd service to manage the Minecraft server and start the service.

```bash
sudo nano /etc/systemd/system/minecraft.service
```
```plaintext
[Unit]
Description=Minecraft Server
After=network.target
[Service]
User=minecraft
Nice=1
KillMode=none
SuccessExitStatus=0 1
ProtectHome=true
ProtectSystem=full
PrivateDevices=true
NoNewPrivileges=true
WorkingDirectory=/opt/minecraft/server
ExecStart=/usr/bin/java -Xmx1024M -Xms1024M -jar server.jar nogui
ExecStop=/opt/minecraft/tools/mcrcon/mcrcon -H 127.0.0.1 -P 25575 -p strong-password stop
[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl start minecraft
sudo systemctl status minecraft
sudo systemctl enable minecraft
sudo ufw allow 25565/tcp
sudo su - minecraft
```

## 7. Creating Backup Script

Create a backup script for periodic server data backups.

```bash
nano /opt/minecraft/tools/backup.sh
```
```plaintext
#!/bin/bash

function rcon {
  /opt/minecraft/tools/mcrcon/mcrcon -H 127.0.0.1 -P 25575 -p strong-password "$1"
}

rcon "save-off"
rcon "save-all"
tar -cvpzf /opt/minecraft/backups/server-$(date +%F-%H-%M).tar.gz /opt/minecraft/server
rcon "save-on"

## Delete older backups
find /opt/minecraft/backups/ -type f -mtime +7 -name '*.gz' -delete
```

```bash
chmod +x /opt/minecraft/tools/backup.sh
crontab -e
```

## 8. Creating Command Alias

For convenience, we'll create a command alias.

```bash
nano ./.bashrc
```
```plaintext
alias mccommand='/opt/minecraft/tools/mcrcon/mcrcon -H 127.0.0.1 -P 25575 -p strong-password -t'
```

Load the new bash configuration.

```bash
source ./.bashrc
```

Now you can use `mccommand` to send commands to the Minecraft server.

```bash
mccommand
```

With this, the Minecraft server has been successfully set up and is running on the Ubuntu server.

---

# Ubuntu服务器搭建Minecraft服务器的一次记录

这个文档记录了如何在Ubuntu服务器上搭建Minecraft服务器的过程。包括了安装必要的软件、配置服务器和创建备份脚本等步骤。

## 1. 安装必要的软件

首先，我们需要更新软件包列表并安装一些必要的软件。

```bash
sudo apt update
sudo apt install git build-essential -y
```

接下来，我们将添加Java的PPA并安装Java 17。

```bash
sudo add-apt-repository ppa:linuxuprising/java 
sudo apt-get install oracle-java17-installer
java -version
```

## 2. 创建Minecraft用户和目录

创建一个新的系统用户来运行Minecraft服务器，并为该用户设置必要的目录。

```bash
sudo useradd -r -m -U -d /opt/minecraft -s /bin/bash minecraft
sudo su - minecraft
mkdir -p ~/{backups,tools,server}
```

## 3. 安装mcrcon

mcrcon是一个轻量级的RCON客户端，用于远程连接Minecraft服务器。

```bash
git clone https://hub.fastgit.xyz/Tiiffi/mcrcon.git ~/tools/mcrcon 
cd ~/tools/mcrcon
gcc -std=gnu11 -pedantic -Wall -Wextra -O2 -s -o mcrcon mcrcon.c  #编译mcrcon
./mcrcon -v
```

## 4. 安装Minecraft服务器

下载并运行Minecraft服务器。

```bash
wget https://launcher.mojang.com/v1/objects/e00c4052dac1d59a1188b2aa9d5a87113aaf1122/server.jar -P ~/server
cd ~/server
java -Xmx1024M -Xms1024M -jar server.jar nogui
```

## 5. 配置Minecraft服务器

接受EULA并配置服务器属性。

```bash
nano ~/server/eula.txt
```
```plaintext
eula=true
```

```bash
nano ~/server/server.properties
```
```plaintext
rcon.port=25575
rcon.password=strong-password
enable-rcon=true
```

## 6. 创建并启动Minecraft服务

创建一个新的systemd服务来管理Minecraft服务器，并启动服务。

```bash
sudo nano /etc/systemd/system/minecraft.service
```
```plaintext
[Unit]
Description=Minecraft Server
After=network.target
[Service]
User=minecraft
Nice=1
KillMode=none
SuccessExitStatus=0 1
ProtectHome=true
ProtectSystem=full
PrivateDevices=true
NoNewPrivileges=true
WorkingDirectory=/opt/minecraft/server
ExecStart=/usr/bin/java -Xmx1024M -Xms1024M -jar server.jar nogui
ExecStop=/opt/minecraft/tools/mcrcon/mcrcon -H 127.0.0.1 -P 25575 -p strong-password stop
[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl start minecraft
sudo systemctl status minecraft
sudo systemctl enable minecraft
sudo ufw allow 25565/tcp
sudo su - minecraft
```

## 7. 创建备份脚本

创建一个备份脚本来定期备份服务器数据。

```bash
nano /opt/minecraft/tools/backup.sh
```
```plaintext
#!/bin/bash

function rcon {
  /opt/minecraft/tools/mcrcon/mcrcon -H 127.0.0.1 -P 25575 -p strong-password "$1"
}

rcon "save-off"
rcon "save-all"
tar -cvpzf /opt/minecraft/backups/server-$(date +%F-%H-%M).tar.gz /opt/minecraft/server
rcon "save-on"

## Delete older backups
find /opt/minecraft/backups/ -type f -mtime +7 -name '*.gz' -delete
```

```bash
chmod +x /opt/minecraft/tools/backup.sh
crontab -e
```

## 8. 创建命令别名

为了方便使用，我们创建一个命令别名。

```bash
nano ./.bashrc
```
```plaintext
alias mccommand='/opt/minecraft/tools/mcrcon/mcrcon -H 127.0.0.1 -P 25575 -p strong-password -t'
```

加载新的bash配置。

```bash
source ./.bashrc
```

现在你可以使用`mccommand`来发送命令到Minecraft服务器了。

```bash
mccommand
```

至此，Minecraft服务器已经成功在Ubuntu服务器上搭建并运行了。
