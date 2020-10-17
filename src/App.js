import React, { useRef } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import './styles/Header.css';
import './styles/HomePage.css';
import './styles/ContactPage.css';
import './styles/ServicePage.css';
import './styles/PortfolioPage.css';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home",
      language: "de",
    };
  }  

  render() {
    return (
      <div className="App">
        <Header 
            changePage={(thisPage) => this.setState({page: thisPage})} 
            changeLanguage={(thisLanguage) => this.setState({language: thisLanguage})} 
            language={this.state.language}
          />
        <MainContent 
          changePage={(thisPage) => this.setState({page: thisPage})} 
          page={this.state.page} 
          language={this.state.language} />
      </div>
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);    
  }

  /* TODO: implement go to contact page */

  render() {
    return (
      <header>
          <div onClick={() => this.props.changePage("home")} className="left" title="Home">CDC<span>.</span></div>
          <div className="right">
              <ul className="headerMenu">
                  <li onClick={() => this.props.changePage("service")}>Service</li>
                  <li onClick={() => this.props.changePage("portfolio")}>Portfolio</li>
                  <li onClick={() => this.props.changePage("contact")}>{(this.props.language === "en") ? "Contact" : "Kontakt"}</li>
              </ul>
              <span className="separator"> | </span>
              <ul className="language">
                  <li className="german" onClick={() => this.props.changeLanguage("de")}><a id="german">DE</a></li>
                  <li className="english" onClick={() => this.props.changeLanguage("en")}><a id="english">EN</a></li>
              </ul>
          </div>
      </header>
    );
  }
}

function MainContent(props) {

  if (props.page === "home") {    

    return (
      <div>
        <HomePage changePage={props.changePage} language={props.language} />
      </div>
    );

  } else if (props.page === "contact") {

    return (
      <div>
        <ContactPage changePage={props.changePage} language={props.language} />
      </div>
    );

  } else if (props.page === "portfolio") {

    return (
      <div>
        <PortfolioPage changePage={props.changePage} language={props.language} />
      </div>
    );

  } else if (props.page === "service") {

    return (      
      <div>
        <ServicePage changePage={props.changePage} language={props.language} />
      </div>
    );

  }
}

function HomePage(props) {
  return (
    <div className="mainContent">
          {/* <!-- left --> */}
          <div className="mainLeftContent">
  
              <h1>Cristian Dias <br/> de Castro<span>.</span></h1>
              <h2><i className="fa fa-map-marker"></i>Hamburg, {(props.language === "en") ? "Germany" : "Deutschland"}</h2>
              <div className="links">
                  <div className="line1">
                      <a>
                          <span className="linkContent"><i className="fa fa-address-card-o"></i>CV</span>
                      </a>
                      <span className="separator">|</span>
                      <a href="https://github.com/diasdecastro">
                          <span className="linkContent"><i className="fa fa-github"></i>Github</span>
                      </a>
                  </div>
                  <div className="line2">
                      <a href="https://www.linkedin.com/in/cristian-dias-de-castro-a57406169/">
                          <span className="linkContent"><i className="fa fa-linkedin"></i>LinkedIn</span>
                      </a>
                      <span className="separator">|</span>
                      <a href="https://www.xing.com/profile/Cristian_DiasdeCastro/cv">
                          <span className="linkContent"><i className="fa fa-xing"></i>Xing</span>
                      </a>
                  </div>
              </div>   
              <a className="contact" onClick={() => props.changePage("contact")} ><span>{(props.language === "en") ? "CONTACT ME" : "KONTAKTIERE MICH"}</span></a>
  
          </div>
  
          
          {/* <!-- middle --> */}
          <div className="mainMiddleContent">
              <img className="profilePic" src={require('./resources/God_Save_the_Queen-removebg-preview.png')} />
          </div>
  
          {/* <!-- right --> */}
          <div className="mainRightContent">
  
              <div className="summary">
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

function ContactPage(props) {
  return(
    <div className="contactMainContent">
        <h1 className="contactHeader">{(props.language === "en") ? "Contact" : "Kontakt"}</h1>
        <form id="messageForm" method="POST">
          <label htmlFor="name">Name</label>
          <input type="text" 
            name="name" 
              placeholder="Marcus Aurelius" 
              autoComplete="off"                 
              />
          <label htmlFor="subject">{(props.language === "en") ? "Subject" : "Betreff"}</label>
          <input type="text" 
            name="subject" 
            placeholder={(props.language === "en") ? "Personal Blog" : "Persönliche Webseite"} 
            autoComplete="off"              
            />
          <label htmlFor="message">{(props.language === "en") ? "Message" : "Nachricht"}</label>
          <textarea
            name="message" 
            placeholder={(props.language === "en") ? "Hello Cristian ..." : "Hallo Cristian ..."} 
            autoComplete="off"             
            />
          <input type="submit" value={(props.language === "en") ? "Send" : "Senden"} />
        </form>
        <div className="goHome" onClick={() => props.changePage("home")}><i className="fa fa-home"></i></div>
        <div className="email">{(props.language === "en") ? "Or send an email to" : "Oder sende eine Email an"}: cristian.diass@hotmail.com</div>
    </div>    
  );
}

function PortfolioPage(props) {
  return (
    <div className="portfolioMainContent">
      <h1 className="portfolioTitle">Portfolio</h1>
      <div className="goHome" onClick={() => props.changePage("home")}><i className="fa fa-home"></i></div>
    </div>
    
  )
}

function ServicePage(props) {

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  return (
    <div className="serviceMainContent">

      <div className="aboutContainer">

        <div className="aboutService">
          <h1 className="aboutTitle">My service</h1>
          <p className="aboutParagraph">
            My service ist this, that and that and this an ah! Bla
            Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla 
            Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla 
            Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla 
            Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla 
            Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla 
          </p>
        </div>

        <h2 className="sampleBoxTitle">Check it out!</h2>
        <div className="showSamples" onClick={executeScroll}><i className="fa fa-arrow-down"></i></div>       
      
      </div>      
      
      <div className="sampleBox" ref={myRef}>
        
        <div className="sampleItems">

          <article className="sample1">
            <h3 className="sampleTitle">Sample 1</h3>
            <div className="sampleImg"><img src="" /></div>
            <div className="sampleDescription">
              <p>
                This is a small description of the sample. Not more
                then 2-3 sentences and a "link" to the sample. This is a small description of the sample. Not more
                then 2-3 sentences and a "link" to the sample. <i className="fa fa-arrow-right"></i>
              </p>
            </div>
          </article>

          <article className="sample2">
            <h3 className="sampleTitle">Sample 2</h3>
            <div className="sampleImg"><img src="" /></div>
            <div className="sampleDescription">
              <p>
                This is a small description of the sample. Not more
                then 2-3 sentences and a "link to the sample" <i className="fa fa-arrow-right"></i>
              </p>
            </div>
          </article>

          <article className="sample3">
            <h3 className="sampleTitle">Sample 3</h3>
            <div className="sampleImg"><img src="" /></div>
            <div className="sampleDescription">
              <p>
                This is a small description of the sample. Not more
                then 2-3 sentences and a "link to the sample" <i className="fa fa-arrow-right"></i>
              </p>
            </div>
          </article>

        </div>

      </div>
        

      <div className="goHome" onClick={() => props.changePage("home")}><i className="fa fa-home"></i></div>
    </div>
  );
}

export default App;
