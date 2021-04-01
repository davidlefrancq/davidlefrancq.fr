# 1 - Construire l'image
- docker build -t dl-react ./

# 2 - Instancier le container
Exemple :
- docker run -d -p 192.168.0.3:80:80 --name dlreact dl-react

# 3 - Exécuter un shell interactif
- docker exec -it dlreact bash

# 4 - Certificat Let's Encrypt
- cd
- apt-get install cron wget
- wget -O -  https://get.acme.sh | sh
- export OVH_AK=RMY00000 `OVH Application Key`
- export OVH_AS=GBt00000 `OVH Application Secret`
- ./acme.sh --issue -d davidlefrancq.fr --dns dns_ovh --force
- `! Attention !`
  `Vous devez ouvrir l'url qui vous est proposé dans un navigateur, valider l'autentification et relancer la commande ci-dessus.`
- ./acme.sh --install-cert --domain davidlefrancq.fr --cert-file /root/.acme.sh/davidlefrancq.fr/cert.pem --key-file /root/.acme.sh/davidlefrancq.fr/key.pem --fullchain-file /root/.acme.sh/davidlefrancq.fr/fullchain.pem --reloadcmd "service apache2 force-reload"

### 5.1 - Renouvellement des certificats
 - acme.sh --renew -d davidlefrancq.fr --force

# 5 - Config Apache
- cd /app
- chown -R root:www-data ./
- a2enmod rewrite
- a2ensite dlreact
- a2ensite dlreactssl
- service apache2 reload