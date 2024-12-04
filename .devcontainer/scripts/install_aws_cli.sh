# install_aws_cli.sh
#!/bin/bash
# Install AWS CLI v2
cd /tmp
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
ls -l
unzip awscliv2.zip
sudo ./aws/install
rm -rf awscliv2.zip aws
## install aws session manager for container exec
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_64bit/session-manager-plugin.deb" -o "session-manager-plugin.deb"
sudo dpkg -i session-manager-plugin.deb