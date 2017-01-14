# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "debian/jessie64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder ".", "/vagrant", type: "rsync", rsync__exclude: [".git/", ".vagrant/", "/node_modules"]

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    # Update repos.
    apt-get update

    # Utilities.
    apt-get install -y tar curl wget unzip apt-transport-https mc

    # Node.js.
    # The GPG key is needed to work with custom package repos (see below).
    curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
    # Version of Node.js is totally outdated in Debian Jessie so we have to use
    # a custom repository to get a "fresh" Node.js bin.
    echo "deb https://deb.nodesource.com/node_6.x jessie main" > /etc/apt/sources.list.d/nodesource.list
    echo "deb-src https://deb.nodesource.com/node_6.x jessie main" >> /etc/apt/sources.list.d/nodesource.list
    apt-get update
    apt-get install -y nodejs
    # Move all NPM modules out of synced folder. It's needed to just install
    # them. If we don't do this hack "npm install" fails because it cannot
    # create symbolic links (needed for bins) inside of synced folder.
    sudo -u vagrant mkdir /home/vagrant/node_modules
    sudo -u vagrant ln -s /home/vagrant/node_modules /vagrant/node_modules
    # Install all the needed NPM libs.
    cd /vagrant
    sudo -u vagrant npm install

    # Nginx.
    apt-get install -y nginx
    # Use custom config.
    cp /vagrant/vagrant_resources/nginx/default /etc/nginx/sites-available/default
    service nginx restart

    # Apache and PHP.
    apt-get install -y apache2 php5 php5-mysql php5-gd php5-curl
    # We need to modify default apache port to make it plays nice with nginx.
    cp /vagrant/vagrant_resources/apache2/ports.conf /etc/apache2/ports.conf
    # Update configs of the default site to make sure it listens the correct
    # port.
    cp /vagrant/vagrant_resources/apache2/000-default.conf /etc/apache2/sites-available/000-default.conf
    # Enable all required Apache modules.
    a2enmod rewrite
    service apache2 restart

    # MySQL.
    export DEBIAN_FRONTEND="noninteractive"
    debconf-set-selections <<< "mysql-server mysql-server/root_password password root_pwd"
    debconf-set-selections <<< "mysql-server mysql-server/root_password_again password root_pwd"
    apt-get install -y mysql-server
    # Prepare the database.
    mysql -u root -proot_pwd -e "CREATE DATABASE mibew CHARACTER SET utf8;"
    mysql -u root -proot_pwd -e "CREATE USER 'mibew'@'%' IDENTIFIED BY 'mibew_pwd';"
    mysql -u root -proot_pwd -e "GRANT ALL PRIVILEGES ON mibew.* TO 'mibew'@'%';"

    # Mibew.
    # Get the sources.
    mkdir /opt/mibew
    chown vagrant:vagrant /opt/mibew
    cd /opt/mibew
    sudo -u vagrant wget -q https://sourceforge.net/projects/mibew/files/core/2.2.0/mibew-2.2.0.zip
    sudo -u vagrant unzip -q mibew-2.2.0.zip
    rm -rf mibew-2.2.0.zip
    # Link Mibew app root into Apache HTML root dir to make it available from
    # the outside.
    ln -s /opt/mibew /var/www/html/mibew
    # Prepare the installation.
    sudo -u vagrant cp /vagrant/vagrant_resources/mibew/config.yml /opt/mibew/configs/config.yml
    chown www-data:vagrant /opt/mibew/cache
    chown www-data:vagrant /opt/mibew/files/avatar
    # Install Mibew.
    curl -sS -o /dev/null -c /tmp/m_cookies http://127.0.0.1/mibew/install
    curl -sS -o /dev/null -b /tmp/m_cookies http://127.0.0.1/mibew/install/check-requirements
    curl -sS -o /dev/null -b /tmp/m_cookies http://127.0.0.1/mibew/install/check-connection
    curl -sS -o /dev/null -b /tmp/m_cookies http://127.0.0.1/mibew/install/create-tables
    curl -sS -o /dev/null -b /tmp/m_cookies http://127.0.0.1/mibew/install/set-password
    curl -sS -o /dev/null -b /tmp/m_cookies -X POST -d "password=pass&password_confirm=pass" http://127.0.0.1/mibew/install/set-password
    curl -sS -o /dev/null -b /tmp/m_cookies http://127.0.0.1/mibew/install/import-locales
    curl -sS -o /dev/null -b /tmp/m_cookies http://localhost/mibew/install.php/install/done
    rm -f /tmp/m_cookies
    # Create a page with Mibew button.
    rm -f /var/www/html/index.nginx-debian.html
    cp /vagrant/vagrant_resources/html/index.html /var/www/html/index.html
    chown vagrant:vagrant /var/www/html/index.html
  SHELL
end
