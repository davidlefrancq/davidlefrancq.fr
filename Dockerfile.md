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
- export OVH_AK=RMYbaFaBxXCsPekj `OVH Application Key`
- export OVH_AS=GBtXGuKaW7Pgco2gGlLE03BmUFhwt5Gr `OVH Application Secret`
- ./acme.sh --issue -d dev.davidlefrancq.fr --dns dns_ovh --force
- `! Attention !`
  `Vous devez ouvrir l'url qui vous est proposé dans un navigateur, valider l'autentification et relancer la commande ci-dessus.`
- ./acme.sh --install-cert --domain dev.davidlefrancq.fr --cert-file /root/.acme.sh/dev.davidlefrancq.fr/cert.pem --key-file /root/.acme.sh/dev.davidlefrancq.fr/key.pem --fullchain-file /root/.acme.sh/dev.davidlefrancq.fr/fullchain.pem --reloadcmd "service apache2 force-reload"

# 5 - Config Apache
- a2ensite dlreact
- a2ensite dlreactssl
- service apache2 reload