Setting Up Ubuntu Container with GUI Support

On host:
```
# Create a directory for persistent storage
mkdir -p $HOME/ubuntu-data

# Run Ubuntu container with GUI support
podman run -it --privileged \
  --name my-ubuntu \
  -e DISPLAY=$DISPLAY \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -v $HOME/.Xauthority:/root/.Xauthority \
  -v $HOME/ubuntu-data:/root \
  ubuntu:latest

# Allow container to access X server
xhost +local:
```

```
echo "alias ubuntu='podman exec -it my-ubuntu bash'" >> ~/.bashrc
source ~/.bashrc
```


In container
```
apt update
apt install -y x11-apps
xeyes
```


```
apt update
apt install -y curl gpg apt-transport-https

# Add Windsurf repository and install
curl -fsSL "https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/windsurf.gpg" | gpg --dearmor -o /usr/share/keyrings/windsurf-stable-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/windsurf-stable-archive-keyring.gpg arch=amd64] https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/apt stable main" | tee /etc/apt/sources.list.d/windsurf.list > /dev/null

apt update
apt install -y windsurf
```


```
mkdir -p /opt/cursor
cd /opt/cursor
wget https://downloader.cursor.sh/linux/appImage/x64 -O cursor.AppImage
chmod +x cursor.AppImage
```


On host:
```
# Create launch script
cat > $HOME/start-windsurf.sh << 'EOF'
#!/bin/bash
podman exec -i my-ubuntu bash -c "nohup windsurf --no-sandbox --user-data-dir=/root/windsurf-data >/dev/null 2>&1 &"
EOF

chmod +x $HOME/start-windsurf.sh

# Create desktop entry
cat > $HOME/Desktop/windsurf.desktop << EOF
[Desktop Entry]
Name=Windsurf
Comment=Launch Windsurf in container
Exec=$HOME/start-windsurf.sh
Terminal=false
Type=Application
Categories=Development;
EOF

chmod +x $HOME/Desktop/windsurf.desktop
```


```
# Create launch script
cat > $HOME/start-cursor.sh << 'EOF'
#!/bin/bash
podman exec -i my-ubuntu bash -c "cd /opt/cursor && ./cursor.AppImage --no-sandbox >/dev/null 2>&1 &"
EOF

chmod +x $HOME/start-cursor.sh

# Create desktop entry
cat > $HOME/Desktop/cursor.desktop << EOF
[Desktop Entry]
Name=Cursor
Comment=Launch Cursor in container
Exec=$HOME/start-cursor.sh
Terminal=false
Type=Application
Categories=Development;
EOF

chmod +x $HOME/Desktop/cursor.desktop
```
