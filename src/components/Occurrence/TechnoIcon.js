import React, {Component} from 'react';
import {
    AiFillHtml5,
    AiOutlineWindows,
    BsFileCode,
    DiJqueryLogo,
    DiNodejs,
    FaAndroid,
    FaCss3Alt,
    FaDocker,
    FaEthereum,
    FaEthernet,
    FaGitAlt,
    FaJava,
    FaJoomla,
    FaNetworkWired,
    FaNodeJs,
    FaPhone,
    FaReact,
    FaSatelliteDish,
    FaSymfony,
    FaWindows,
    FcDebian, GiArchiveResearch,
    GiCircuitry,
    GiElephant,
    GiLaserPrecision,
    GiLogicGateAnd,
    GiProcessor,
    GiWifiRouter,
    GoCircuitBoard,
    GrUpdate,
    HiUserGroup, IoIosSpeedometer, MdDashboard, MdDeviceHub,
    MdLocalHospital,
    RiDatabase2Fill,
    SiApache,
    SiJavascript,
    SiJetbrains,
    SiMicrosoftsharepoint,
    SiRedux
} from "react-icons/all";

const size = 28;

class TechnoIcon extends Component {

    javascript() {
        return (
            <div className={"d-inline m-2"}>
                <SiJavascript size={size}/>
            </div>
        );
    }

    react() {
        return (
            <div className={"d-inline m-2"}>
                <FaReact size={size}/>
            </div>
        );
    }

    symfony() {
        return (
            <div className={"d-inline m-2"}>
                <FaSymfony size={size}/>
            </div>
        );
    }

    php() {
        return (
            <div className={"d-inline m-2"}>
                <GiElephant size={size} style={{transform: "rotateY(3.142rad)"}}/>
            </div>
        );
    }

    bdd() {
        return (
            <div className={"d-inline m-2"}>
                <RiDatabase2Fill size={size}/>
            </div>
        );
    }

    ethereum() {
        return (
            <div className={"d-inline m-2"}>
                <FaEthereum size={size}/>
            </div>
        );
    }

    jetbrains() {
        return (
            <div className={"d-inline m-2"}>
                <SiJetbrains size={size}/>
            </div>
        );
    }

    git() {
        return (
            <div className={"d-inline m-2"}>
                <FaGitAlt size={size}/>
            </div>
        );
    }

    docker() {
        return (
            <div className={"d-inline m-2"}>
                <FaDocker size={size}/>
            </div>
        );
    }

    windows() {
        return (
            <div className={"d-inline m-2"}>
                <FaWindows size={size}/>
            </div>
        );
    }

    debian() {
        return (
            <div className={"d-inline m-2"}>
                <FcDebian size={size}/>
            </div>
        );
    }

    group() {
        return (
            <div className={"d-inline m-2"}>
                <HiUserGroup size={size}/>
            </div>
        );
    }

    ethernet() {
        return (
            <div className={"d-inline m-2"}>
                <FaEthernet size={size*0.8}/>
            </div>
        );
    }

    networ() {
        return (
            <div className={"d-inline m-2"}>
                <FaNetworkWired size={size*0.8}/>
            </div>
        );
    }

    routeur() {
        return (
            <div className={"d-inline m-2"}>
                <GiWifiRouter size={size}/>
            </div>
        );
    }

    laser() {
        return (
            <div className={"d-inline m-2"}>
                <GiLaserPrecision size={size}/>
            </div>
        );
    }

    html() {
        return (
            <div className={"d-inline m-2"}>
                <AiFillHtml5 size={size}/>
            </div>
        );
    }

    joomla() {
        return (
            <div className={"d-inline m-2"}>
                <FaJoomla size={size}/>
            </div>
        );
    }

    css() {
        return (
            <div className={"d-inline m-2"}>
                <FaCss3Alt size={size}/>
            </div>
        );
    }

    code() {
        return (
            <div className={"d-inline m-2"}>
                <BsFileCode size={size}/>
            </div>
        );
    }

    sharepoint() {
        return (
            <div className={"d-inline m-2"}>
                <SiMicrosoftsharepoint size={size}/>
            </div>
        );
    }

    jquery() {
        return (
            <div className={"d-inline m-2"}>
                <DiJqueryLogo size={size}/>
            </div>
        );
    }

    java() {
        return (
            <div className={"d-inline m-2"}>
                <FaJava size={size}/>
            </div>
        );
    }

    satelite() {
        return (
            <div className={"d-inline m-2"}>
                <FaSatelliteDish size={size}/>
            </div>
        );
    }

    phone() {
        return (
            <div className={"d-inline m-2"}>
                <FaPhone size={size*0.8}/>
            </div>
        );
    }

    electronic() {
        return (
            <div className={"d-inline m-2"}>
                <GiProcessor size={size}/>
            </div>
        );
    }

    update() {
        return (
            <div className={"d-inline m-2"}>
                <AiOutlineWindows size={size}/>
            </div>
        );
    }

    redux() {
        return (
            <div className={"d-inline m-2"}>
                <SiRedux size={size}/>
            </div>
        );
    }

    apache() {
        return (
            <div className={"d-inline m-2"}>
                <SiApache size={size}/>
            </div>
        );
    }

    android() {
        return (
            <div className={"d-inline m-2"}>
                <FaAndroid size={size}/>
            </div>
        );
    }

    node() {
        return (
            <div className={"d-inline m-2"}>
                <FaNodeJs size={size}/>
            </div>
        );
    }

    ethereum() {
        return (
            <div className={"d-inline m-2"}>
                <FaEthereum size={size}/>
            </div>
        );
    }

    healing() {
        return (
            <div className={"d-inline m-2"}>
                <MdLocalHospital size={size}/>
            </div>
        );
    }

    logicGate() {
        return (
            <div className={"d-inline m-2"}>
                <GiLogicGateAnd size={size}/>
            </div>
        );
    }

    transistor() {
        return (
            <div className={"d-inline m-2"}>
                <MdDeviceHub size={size*0.8}/>
            </div>
        );
    }

    circuitBoard() {
        return (
            <div className={"d-inline m-2"}>
                <GoCircuitBoard size={size*0.8}/>
            </div>
        );
    }

    analyse() {
        return (
            <div className={"d-inline m-2"}>
                <GiArchiveResearch size={size*0.8}/>
            </div>
        );
    }

    measure() {
        return (
            <div className={"d-inline m-2"}>
                <IoIosSpeedometer size={size*0.8}/>
            </div>
        );
    }

    dashboard() {
        return (
            <div className={"d-inline m-2"}>
                <MdDashboard size={size*0.8}/>
            </div>
        );
    }

    searchIconByName() {
        if (this.props.name) {
            const original = this.props.name.toLowerCase();

            if (original.indexOf("gestes qui sauvent") >= 0) {
                return this.healing();
            }

            if (original.indexOf("portes logiques") >= 0) {
                return this.logicGate();
            }

            if (original.indexOf("transistor") >= 0) {
                return this.transistor();
            }

            if (original.indexOf("circuit imprimé") >= 0) {
                return this.circuitBoard();
            }

            if (original.indexOf("annalyse") >= 0) {
                return this.analyse();
            }

            if (original.indexOf("mesures") >= 0) {
                return this.measure();
            }

            if (original.indexOf("conception") >= 0) {
                return this.dashboard();
            }

            if (original.indexOf("php") >= 0) {
                return this.php();
            }

            if (original.indexOf("html") >= 0) {
                return this.html();
            }

            if (original.indexOf("css") >= 0) {
                return this.css();
            }

            if (original.indexOf("joomla") >= 0) {
                return this.joomla();
            }

            if (original.indexOf("javascript") >= 0) {
                return this.javascript();
            }

            if (original.indexOf("react") >= 0) {
                return this.react();
            }

            if (original.indexOf("symfony") >= 0) {
                return this.symfony();
            }

            if (original.indexOf("bdd") >= 0) {
                return this.bdd();
            }

            if (original.indexOf("sql") >= 0) {
                return this.bdd();
            }

            if (original.indexOf("oracle") >= 0) {
                return this.bdd();
            }

            if (original.indexOf("sqlite") >= 0) {
                return this.bdd();
            }

            if (original.indexOf("ethereum") >= 0) {
                return this.ethereum();
            }

            if (original.indexOf("jetbrains") >= 0) {
                return this.jetbrains();
            }

            if (original.indexOf("intellij") >= 0) {
                return this.jetbrains();
            }

            if (original.indexOf("phpstorm") >= 0) {
                return this.jetbrains();
            }

            if (original.indexOf("git") >= 0) {
                return this.git();
            }

            if (original.indexOf("docker") >= 0) {
                return this.docker();
            }

            if (original.indexOf("windows") >= 0) {
                return this.windows();
            }

            if (original.indexOf("debian") >= 0) {
                return this.debian();
            }

            if (original.indexOf("sharepoint") >= 0) {
                return this.sharepoint();
            }

            if (original.indexOf("jquery") >= 0) {
                return this.jquery();
            }

            if (original.indexOf("group") >= 0) {
                return this.group();
            }

            if (original.indexOf("groupe") >= 0) {
                return this.group();
            }

            if (original.indexOf("ethernet") >= 0) {
                return this.ethernet();
            }

            if (original.indexOf("tcp") >= 0) {
                return this.networ();
            }

            if (original.indexOf("fibre") >= 0) {
                return this.laser();
            }

            if (original.indexOf("routeur") >= 0) {
                return this.routeur();
            }

            if (original.indexOf("switch") >= 0) {
                return this.routeur();
            }

            if (original.indexOf("javaee") >= 0) {
                return this.java();
            }

            if (original.indexOf("satelite") >= 0) {
                return this.satelite();
            }

            if (original.indexOf("téléphon") >= 0) {
                return this.phone();
            }

            if (original.indexOf("68hc11") >= 0) {
                return this.electronic();
            }

            if (original.indexOf("active directory") >= 0) {
                return this.windows();
            }

            if (original.indexOf("wsus") >= 0) {
                return this.update();
            }

            if (original.indexOf("apache") >= 0) {
                return this.apache();
            }

            if (original.indexOf("android") >= 0) {
                return this.android();
            }

            if (original.indexOf("node") >= 0) {
                return this.node();
            }

            if (original.indexOf("redux") >= 0) {
                return this.redux();
            }

            if (original.indexOf("solidity") >= 0) {
                return this.ethereum();
            }

            return this.code();
        }
    }

    render() {
        return this.searchIconByName();
    }
}

export default TechnoIcon;
