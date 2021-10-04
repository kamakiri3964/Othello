FROM nvidia/cuda:11.1.1-cudnn8-devel-ubuntu20.04

ARG USERNAME=bob
ARG USER_UID=1000
ARG USER_GID=${USER_UID}

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Tokyo

RUN apt-get update \
    && apt-get install -y --no-install-recommends apt-utils dialog \
    && echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections \
    && apt-get install -y git iproute2 procps lsb-release \
    && apt-get install -y curl unzip \
    && groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd -s /bin/bash --uid ${USER_UID} --gid ${USER_GID} -m ${USERNAME} \
    && apt-get install -y sudo \
    && echo ${USERNAME} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME}

USER ${USERNAME}
WORKDIR /home/${USERNAME}

RUN sudo apt-get -y install \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    libssl-dev \
    make \
    gzip \
    ripgrep

# install fzf
RUN git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf && \
    ~/.fzf/install --key-bindings --completion --update-rc

# install poetry
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python3 -

# install rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | bash -s -- -y && \
    echo "export PATH=$HOME/.cargo/bin:$PATH" >> $HOME/.profile