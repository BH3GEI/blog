# Set Up V2Ray Server with VMess Protocol

## Introduction
In this tutorial, I'll guide you through setting up a V2Ray server using the VMess protocol with HTTP camouflage. This setup is particularly useful for users who need a reliable and secure proxy solution.

## Prerequisites
- A Linux server (Ubuntu/Debian recommended)
- Root access to the server
- Basic command line knowledge

## Step 1: Installing V2Ray
First, we need to install V2Ray on your server. The installation process has been updated recently, and we'll use the official installation script:
```sh
curl -O https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh
bash install-release.sh
```
For users who might have trouble accessing GitHub, you can also install the necessary tools first:
```sh
apt update
apt install curl wget unzip -y
```

## Step 2: Creating the Configuration
After installation, we need to create and configure the V2Ray configuration file. Create a directory for the configuration:
```sh
mkdir -p /usr/local/etc/v2ray
```
Then create and edit the configuration file:
```sh
nano /usr/local/etc/v2ray/config.json
```
Insert the following configuration (make sure to replace the UUID with your own):
```json
{
  "inbounds": [{
    "port": 80,
    "protocol": "vmess",
    "settings": {
      "clients": [
        {
          "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
          "alterId": 0,
          "security": "aes-128-gcm"
        }
      ]
    },
    "streamSettings": {
      "network": "tcp",
      "tcpSettings": {
        "header": {
          "type": "http",
          "request": {
            "version": "1.1",
            "method": "GET",
            "path": ["/"],
            "headers": {
              "Host": ["bilibili.com"],
              "User-Agent": [
                "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36",
                "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_2 like Mac OS X)"
              ],
              "Accept-Encoding": ["gzip, deflate"],
              "Connection": ["keep-alive"],
              "Pragma": "no-cache"
            }
          }
        }
      }
    }
  }],
  "outbounds": [{
    "protocol": "freedom",
    "settings": {}
  }, {
    "protocol": "blackhole",
    "settings": {},
    "tag": "blocked"
  }]
}
```

## Step 3: Starting and Enabling the Service
After configuring V2Ray, we need to start the service and enable it to start on boot:
```sh
systemctl start v2ray
systemctl enable v2ray
systemctl status v2ray
```

## Step 4: Configuring the Firewall
Make sure the required port (80 in this case) is open in your firewall:
```sh
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --reload
```

## Step 5: Verifying the Setup
Check the V2Ray service status and logs:
```sh
systemctl status v2ray
journalctl -u v2ray
```

## Configuration Details
- Protocol: VMess
- Port: 80
- Encryption: AES-128-GCM
- Network: TCP with HTTP camouflage
- Fake Website: bilibili.com

