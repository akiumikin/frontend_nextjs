Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-22.04"
  config.vm.hostname = "ubuntu-box"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "4096"
  end

  config.vm.network "forwarded_port", guest: 3000, host: 5000

  # config.vm.synced_folder ".", "/vagrant", type: "rsync",
  #   rsync__exclude: [ "node_modules/" ]

  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y git vim docker.io
  SHELL

  # vagrant ssh時に自動で/vagrantを開く
  config.ssh.insert_key = false
  config.ssh.forward_agent = true
  config.ssh.username = "vagrant"
  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"
  config.vm.provision "shell", inline: <<-SHELL
    echo 'cd /vagrant' >> /home/vagrant/.bashrc
  SHELL

  # docker-composeを利用できるようにする
  config.vm.provision "shell", inline: <<-SHELL
    curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m) \
      -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
  SHELL

  # vagrantユーザーをdockerグループに追加
  config.vm.provision "shell", inline: <<-SHELL
    usermod -aG docker vagrant
  SHELL
end
