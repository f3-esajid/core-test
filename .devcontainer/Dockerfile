##
# LEVIATHAN DEV CONTAINER
# NOTE: Only global dependencies should be installed in this file. Project-specific dependencies
# should be installed via their `setup.sh` file.

ARG VARIANT=3.3-bullseye
FROM mcr.microsoft.com/devcontainers/ruby:${VARIANT}

# Install Java
RUN sudo apt-get update && sudo apt install -y openjdk-17-jdk

# Install Node
ARG NODE_VERSION=lts/hydrogen
RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"

# Install Pyenv
RUN su vscode -c "curl https://pyenv.run | bash"

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends wkhtmltopdf

USER vscode
RUN gem install bundler:2.4.22 foreman

# Add Yarn install location to PATH
ENV PATH "/home/vscode/.yarn/bin:$PATH"


# Setup Leviathan DIR
ENV LEVIATHAN_DIR "/leviathan"

# Additional packages
RUN sudo apt-get install -y vim
#RUN npx -y playwright@1.47.1 install --with-deps ## moved this to manage-core and core-web setup.sh file

# Use zshenv for all important path things
ADD --chown=vscode:vscode zshenv /home/vscode/.zshenv

# Copy the scripts directory
ADD --chown=vscode:root --chmod=755 scripts/* /home/vscode/.setup-scripts/

# Run install scripts
RUN /home/vscode/.setup-scripts/install_aws_cli.sh
RUN /home/vscode/.setup-scripts/install_terraform.sh
