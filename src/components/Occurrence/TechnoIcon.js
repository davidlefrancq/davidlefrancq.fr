import React, {Component} from 'react';
import {
    AiFillHtml5, BsFileCode, DiJqueryLogo, FaCss3Alt,
    FaDocker,
    FaEthereum,
    FaGitAlt, FaJoomla,
    FaReact,
    FaSymfony, FaWindows, FcDebian,
    GiElephant, HiUserGroup,
    RiDatabase2Fill,
    SiJavascript,
    SiJetbrains, SiMicrosoftsharepoint
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

    html() {
        return (
            <div className={"d-inline m-2"}>
                <AiFillHtml5 size={size}/>
            </div>
        );
    }

    joomla(){
        return (
            <div className={"d-inline m-2"}>
                <FaJoomla size={size}/>
            </div>
        );
    }

    css(){
        return (
            <div className={"d-inline m-2"}>
                <FaCss3Alt size={size}/>
            </div>
        );
    }

    code(){
        return (
            <div className={"d-inline m-2"}>
                <BsFileCode size={size}/>
            </div>
        );
    }

    sharepoint(){
        return (
            <div className={"d-inline m-2"}>
                <SiMicrosoftsharepoint size={size}/>
            </div>
        );
    }

    jquery(){
        return (
            <div className={"d-inline m-2"}>
                <DiJqueryLogo size={size}/>
            </div>
        );
    }

    searchIconByName(){
        const original = this.props.name.toLowerCase();
        if(original.indexOf("php") >= 0){
            return this.php();
        };
        if(original.indexOf("html") >= 0){
            return this.html();
        };
        if(original.indexOf("css") >= 0){
            return this.css();
        };
        if(original.indexOf("joomla") >= 0){
            return this.joomla();
        };
        if(original.indexOf("javascript") >= 0){
            return this.javascript();
        };
        if(original.indexOf("react") >= 0){
            return this.react();
        };
        if(original.indexOf("symfony") >= 0){
            return this.symfony();
        };
        if(original.indexOf("bdd") >= 0){
            return this.bdd();
        };
        if(original.indexOf("sql") >= 0){
            return this.bdd();
        };
        if(original.indexOf("oracle") >= 0){
            return this.bdd();
        };
        if(original.indexOf("sqlite") >= 0){
            return this.bdd();
        };
        if(original.indexOf("ethereum") >= 0){
            return this.ethereum();
        };
        if(original.indexOf("jetbrains") >= 0){
            return this.jetbrains();
        };
        if(original.indexOf("intellij") >= 0){
            return this.jetbrains();
        };
        if(original.indexOf("phpstorm") >= 0){
            return this.jetbrains();
        };
        if(original.indexOf("git") >= 0){
            return this.git();
        };
        if(original.indexOf("docker") >= 0){
            return this.docker();
        };
        if(original.indexOf("windows") >= 0){
            return this.windows();
        };
        if(original.indexOf("debian") >= 0){
            return this.debian();
        };
        if(original.indexOf("sharepoint") >= 0){
            return this.sharepoint();
        };
        if(original.indexOf("jquery") >= 0){
            return this.jquery();
        };
        if(original.indexOf("group") >= 0){
            return this.group();
        };
        if(original.indexOf("groupe") >= 0){
            return this.group();
        }else{
            return this.code();
        };

    }

    render() {
        return this.searchIconByName();
    }
}

export default TechnoIcon;
