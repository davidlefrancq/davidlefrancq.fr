const data = {
    occurences: {
        occurence1: {
            dateStart: "",
            dateEnd: new Date("2019-12-02T00:00:00"),
            experience: null,
            qualification: {
                title: "Concepteur Développeur Informatique",
                img: "https://edito.regionsjob.com/xjob/wp-content/uploads/sites/3/2016/02/code_developpeur.jpg",
                level: "Bac+4",
                trainingCenter: {
                    name: "ENI Ecole Informatique",
                    logo: "https://www.eni-ecole.fr/Content/Images/Static/logo-eni.png",
                    address: "ZAC de, La Conterie, 8 Rue Léo Lagrange, 35131 Chartres-de-Bretagne",
                    url: "https://www.eni-ecole.fr/",
                },
                objectives: "Le (la) concepteur (trice)-développeur (se) informatique prend en charge la conception et le développement d'applications informatiques. Il (elle) agit avec autonomie et, le cas échéant, avec des responsabilités d'animation et de coordination, dans le cadre de projets visant à automatiser un ou plusieurs processus de l'entreprise. Ces projets font suite à des demandes formulées directement par un client, par une maîtrise d'ouvrage ou par l'intermédiaire d'un chef de projet, afin de réaliser de nouvelles applications ou la maintenance évolutive d'applications existantes.",
                jobs: {
                    job1: {
                        name: "Développeur informatique",
                    },
                    job2: {
                        name: "Développeur web",
                    },
                    job3: {
                        name: "Analyste programmeur",
                    },
                    job4: {
                        name: "Concepteur d'applications",
                    },
                    job5: {
                        name: "Ingénieur d'études et développement",
                    },
                },
                links: {
                    link1: {
                        title: "RNCP",
                        url: "https://certificationprofessionnelle.fr/recherche/rncp/6255",
                    }
                },
            }
        },
        occurence2: {
            dateStart: new Date("2018-04-16T00:00:00"),
            dateEnd: new Date("2019-11-29T00:00:00"),
            experience: {
                jobTitle: "Concepteur Développeur d'Application",
                comment:"Au sein d'un groupe d'entreprise de recherche de fuite, ma tâche principale a été de concevoir une application métier de suivi et de gestion de rapport d'intervention.",
                img: null,
                enterprise: {
                    name: "Groupe AFD",
                    logo: "https://www.atlantic-fuite.com/wp-content/uploads/2018/01/Logo-AFD.png",
                    address: "37 impasse Marie Curie 56130 Nivillac",
                    url: "https://www.atlantic-fuite.com/",
                },
                technologicalCategories: {
                    category1: {
                        name: "Symfony 3",
                        logo: "https://www.nextedia.com/wp-content/uploads/2019/11/template-logo-page-partenaire-Symfony.png",
                    },
                    category2: {
                        name: "JavaScript",
                        logo: "http://blog.kreatys.com/wp-content/uploads/2019/03/javascript-logo-8892AEFCAC-seeklogo.com_.png",
                    },
                    category3: {
                        name: "",
                        logo: "",
                    },
                },
                workstudy: true,
                links: {
                    link1:{
                        title:"Atlas",
                        url:"https://atlas.groupeafd.com/",
                    },
                },
            },
            qualification: null,
        },
    },
    jobs: {
        job1: {
            title: "Analyste programmeur",
        },
        job2: {
            title: "Concepteur d'applications",
        },
        job3: {
            title: "Ingénieur d'études et développement",
        },
    },
    technologies: {
        technology1: {
            name: "PHP",
            comment: "PHP, langage de programmation, génére dynamiquement des pages web.",
            image: "",
        },
        technology2: {
            name: "Symfony",
            comment: "Symfony, framework PHP. Idéal pour les projets web complexes. Permet de définir un cadre de travail, d'appliquer des normes, des conventions, de bonnes pratiques et un standard de développement. Favorise le développement d'application plus fiable, plus souple et plus facile à maintenir.",
            image: "",
        },
        technology3: {
            name: "ReactJS",
            comment: "",
            image: "",
        },
    },
}

export default data;
