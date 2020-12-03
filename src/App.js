import React, { useRef, useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { Document, Page, pdfjs } from 'react-pdf';
import file from "./Beta.pdf";
import axios from 'axios';
/* import logo from './logo.svg'; */

import './resources/hamburger.css';

import './stylesWide/App.css';
import './stylesWide/Header.css';
import './stylesWide/HomePage.css';
import './stylesWide/ContactPage.css';
import './stylesWide/PortfolioPage.css';
import './stylesWide/CvPage.css';

import './stylesMobile/AppMobile.css';
import './stylesMobile/ContactPageMobile.css';
import './stylesMobile/HeaderMobile.css';
import './stylesMobile/HomePageMobile.css';
import './stylesMobile/PortfolioPageMobile.css';
import './stylesMobile/CvPageMobile.css';


/* pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.bootcss.com/pdf.js/2.2.228/pdf.worker.js"; */
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

class App extends React.Component {

  // duration = 500;

  defaultStyle = {
    transition: `opacity ${ 500 }ms ease-in-out`,
    opacity: 0,
  };

  transitionStyles = {
    entering: {opacity: 0.5},
    entered: {opacity: 1},
    exiting: {opacity: 0.5},
    exited: {opacity: 0},
  }

  constructor(props) {
    super(props);
    this.state = {
      page: "home",
      language: "de",
      fadeProp: false,
    };  
    
  } 
  
  componentDidMount() {
    document.title = (this.state.language === "en") ? 
                      "Cristian Dias de Castro | Web Designer & Front-end Developer":
                      "Cristian Dias de Castro | Web Designer & Frontend Entickler";
    setTimeout( () => this.setState({fadeProp : true}), 0 );    
  }

  componentDidUpdate() {
    document.title = (this.state.language === "en") ? 
                      "Cristian Dias de Castro | Web Designer & Front-end Developer":
                      "Cristian Dias de Castro | Web Designer & Frontend Entickler";
  }

  /* componentWillUnmount() {
    this.fadeIn = setTimeout(
      () => this.setState({fadeProp : false}), 0
    );
  } */

  render() {
    return (      
      <div className="App">
        <div id="background"></div>
        <Header 
            changePage={
              (thisPage) => {
                this.setState({fadeProp: false});
                setTimeout( () => this.setState({page: thisPage, fadeProp: true}), 500 );
                // this.setState({page: thisPage, fadeProp: true});                
              } 
            } 
            changeLanguage={
              (thisLanguage) => {
                this.setState({fadeProp: false});
                setTimeout( () => this.setState({language: thisLanguage, fadeProp: true}), 500 );
              }
            } 
            language={this.state.language}            
          />

        <Transition 
          in={this.state.fadeProp} 
          timeout={0}>
            {              
              state => (
                <div style={{
                    ... this.defaultStyle,
                    ... this.transitionStyles[state],
                }} >

                  <MainContent 
                  changePage={
                    (thisPage) => {
                      this.setState({fadeProp: false});
                      setTimeout( () => this.setState({page: thisPage, fadeProp: true}), 500 );
                      // this.setState({page: thisPage, fadeProp: true});                
                    } 
                  }
                  page={this.state.page} 
                  language={this.state.language}                   
                  /> 

                  <Footer
                    changePage={
                      (thisPage) => {
                        this.setState({fadeProp: false});
                      }                      
                    }
                    />
                </div>
                
              )
            } 
        </Transition>        
      </div>      
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      active : false,
      headerCollapsed: false,
    }
  }

  toggleMenu() {
    if (this.state.active) {      
      this.setState({
        active : false,
        headerCollapsed: false
      });
    } else {
      this.setState({
        active: true,
        headerCollapsed: true
      });
    }
  }

  /* TODO: implement go to contact page */

  render() {
    return (
      <header className={(this.state.headerCollapsed) ? "collapse" : "hidden"}>
          <div onClick={() => window.location.reload()} className="left" title="Home">CDC<span>.</span></div>
          
          
          <div className="right">
          {/* mobile menu */}
            <div className="hamburgerMenu">
              <button id="hamburgerBtn"
                className={(this.state.active) ? 
                            "hamburger hamburger--squeeze is-active" : 
                            "hamburger hamburger--squeeze"}
                onClick={() => this.toggleMenu()}
                type="button">

                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>

              </button>
            </div>

            {/* header menu */}
            <ul className="headerMenu">
                <li onClick={() => {
                  this.toggleMenu();
                  window.open("https://github.com/diasdecastro", "_blank")
                } }>Portfolio</li>
                <li onClick={() => {
                  this.toggleMenu();
                  this.props.changePage("contact");
                }}>{(this.props.language === "en") ? "Contact" : "Kontakt"}</li>
            </ul>
            <span className="separator"> | </span>
            <span className="mobileSeparator">Language</span>
            <ul className="language">                
                <li className="german" onClick={() => {
                  this.toggleMenu();
                  this.props.changeLanguage("de");
                }}><a id="german">DE</a></li>
                <li className="english" onClick={() => {
                  this.toggleMenu();
                  this.props.changeLanguage("en");
                } }><a id="english">EN</a></li>
            </ul>
          </div>
      </header>
    );
  }
}

function Footer(props) {
  return(
    <div className="footerContainer">
      <footer className="footer">
        <p className="copyright">&copy; Copyright 2020 Cristian Dias de Castro</p>
      </footer>
    </div>
  )
}

function MainContent(props) {

  if (props.page === "home") {    

    return (
      <div>
        <HomePage 
        changePage={props.changePage} 
        language={props.language} 
        updateFade={props.updateFade} />
      </div>
    );

  } else if (props.page === "contact") {

    return (
      <div>
        <ContactGeneral changePage={props.changePage} language={props.language} />
      </div>
    );

  } else if (props.page === "thankyou") {
    return (
      <div>
        <ThankyouPage changePage={props.changePage} language={props.language} />
      </div>
    );
  } else if (props.page === "cv") {
    return (
      <div>
        <CvPage language={props.language}/>
      </div>
    )
  }

}

function HomePage(props) {

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  return (
    <div className="mainContent">
          {/* <!-- left --> */}
          <div className="mainLeftContent">
  
              <h1>Cristian Dias <br/> de Castro<span>.</span></h1>
              <h2><i className="fa fa-map-marker"></i>Hamburg, {(props.language === "en") ? "Germany" : "Deutschland"}</h2>
              <div className="links">
                  <div className="line1">
                      <a onClick={() => props.changePage("cv")}>
                          <span className="linkContent"><i className="fa fa-address-card-o"></i>CV</span>
                      </a>
                      <span className="separator">|</span>
                      <a target="_blank" href="https://github.com/diasdecastro">
                          <span className="linkContent"><i className="fa fa-github"></i>Github</span>
                      </a>
                  </div>
                  <div className="line2">
                      <a target="_blank" href="https://www.linkedin.com/in/cristian-dias-de-castro-a57406169/">
                          <span className="linkContent"><i className="fa fa-linkedin"></i>LinkedIn</span>
                      </a>
                      <span className="separator">|</span>
                      <a target="_blank" href="https://www.xing.com/profile/Cristian_DiasdeCastro/cv">
                          <span className="linkContent"><i className="fa fa-xing"></i>Xing</span>
                      </a>
                  </div>
              </div>   
              <a className="contact" onClick={() => props.changePage("contact")} ><span>{(props.language === "en") ? "CONTACT ME" : "KONTAKTIERE MICH"}</span></a>
              <div className="showIntroduction" onClick={executeScroll}><i className="fa fa-arrow-down"></i></div>    
  
          </div>
  
          
          {/* <!-- middle --> */}
          <div className="mainMiddleContent">
              <img className="profilePic" src={require('./resources/tree.png')} />  
          </div>
  
          {/* <!-- right --> */}
          <div className="mainRightContent" >
  
              <div className="summary" ref={myRef} >
                  <h1 className="summaryHead">{props.language === "en" ? "Introduction" : "Über mich"}</h1>
                  <h2 className="summaryTitle">Web Designer,<br /> {(props.language === "en") ? "Front-end Developer" : "Frontend Entwickler"}</h2>
                  <p className="summaryText">
                    {(props.language === "en") ? 
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, \
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,\
                      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet\
                      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Stet\
                      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Stet\
                      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." : 
                      "Hallo. Ich bin ein kleiner Blindtext. Und zwar schon so lange ich denken kann.\
                      Es war nicht leicht zu verstehen, was es bedeutet, ein blinder Text zu sein:\
                      Man ergibt keinen Sinn. Wirklich keinen Sinn. Man wird zusammenhangslos eingeschoben\
                      und rumgedreht – und oftmals gar nicht erst gelesen. Aber bin ich allein deshalb\
                      ein schlechterer Text als andere?"}
                      
                  </p>
              </div>
  
          </div>

      </div>
  );
}

class ContactGeneral extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",    
      subject: "",
      message: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    const data = {
      "firstname": this.state.firstname,
      "lastname": this.state.lastname,
      "email": this.state.email,      
      "subject": this.state.subject,
      "message": this.state.message
    }

    const headers = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    
    axios.post('https://sendmail-plus.herokuapp.com/sendContactForm', data, headers)
      .then(res => {
        if (res.data === "Success") {
          this.props.changePage("thankyou");
        }
      })
      .catch(err => console.log(err))    
       
  }

  render() {    
    return(
      <div className="contactMainContent">
          <h1 className="contactHeader">{(this.props.language === "en") ? "Contact" : "Kontakt"}</h1>
          <form method="POST" id="messageForm" onSubmit={this.handleSubmit}>
            <div className="nameLabelContainer">
              <label htmlFor="firstname">{(this.props.language === "en") ? "First Name *" : "Vorname *"}</label>
              <label htmlFor="lastname">{(this.props.language === "en") ? "Last Name *" : "Nachname *"}</label>
            </div>
            <div className="nameFormContainer">
              <div className="firstnameContainer">
                <input type="text" 
                  name="firstname" 
                    placeholder="Marcus" 
                    autoComplete="off"
                    value={this.state.firstname}
                    onChange={this.handleChange}
                    required     
                    />
              </div>
              <div className="lastnameContainer">
                <input type="text"
                  name="lastname"
                  placeholder="Aurelius"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                  required
                  />
              </div>
            </div>            
            <label htmlFor="email">Email *</label>
            <input type="email"
              name="email"
              placeholder="marcus.aurelius@myemail.com"
              autoComplete="off"
              value={this.state.email}
              onChange={this.handleChange}
              required
              /> 
            <label htmlFor="subject">{(this.props.language === "en") ? "Subject" : "Betreff"}</label>
            <input type="text" 
              name="subject" 
              placeholder={(this.props.language === "en") ? "Personal Blog" : "Persönliche Webseite"} 
              autoComplete="off"  
              value={this.state.subject}
              onChange={this.handleChange}  
              />
            <label htmlFor="message">{(this.props.language === "en") ? "Message *" : "Nachricht *"}</label>
            <textarea
              name="message" 
              placeholder={(this.props.language === "en") ? "Hello Cristian ..." : "Hallo Cristian ..."} 
              autoComplete="off"  
              value={this.state.message}
              onChange={this.handleChange}   
              required       
              />
              <div>
                <input type="checkbox"
                  name="consentCheck"
                  checked={this.state.consentCheck}
                  onChange={this.handleChange}       
                  required            
                  />
                <label htmlFor="consentCheck"> {(this.props.language === "en") ? "I agree " : "Ich bin damit einverstanden, dass die oben angegebenen Daten gelesen und zum Zweck einer Antwort benutzt werden"} </label>
              </div>

            <input type="submit" 
              value={(this.props.language === "en") ? "Send" : "Senden"} 

              />
          </form>
{/*           <div className="goHome" onClick={() => this.props.changePage("home")}><i className="fa fa-home"></i></div>
 */}          <div className="email">{(this.props.language === "en") ? "Or send an email to" : "Oder sende eine Email an"}: cristian.diass@hotmail.com</div>
      </div>    
    );    
  }
}

class ThankyouPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => this.props.changePage("home"), 2500);    
  }

  render() {
    return(
      <div className="thankyou">
        <h1>{(this.props.language === "en") ? "Thank You!" : "Vielen Dank!"}</h1>
      </div>
    )
  }  
}

function CvPage(props) {  
  const [numPages, setNumPages] = useState(null);
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }  
    return (
      <div className="cv">
      <h1 className="cvHeader">{(props.language === "en") ? "Curriculum vitae" : "Lebenslauf"}</h1>
        <Document file={file}
          onLoadSuccess = {onDocumentLoadSuccess}
          onLoadError={console.log(console.error)}          
          >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} width={900}/>
          ))}
        </Document>
      </div>
    );  
}

export default App;
