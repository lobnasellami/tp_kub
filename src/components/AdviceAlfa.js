import React, {useContext} from 'react'
import YouTube from 'react-youtube';
import { LanguageContext } from '../LanguageContext';

export default function AdviceAlfa() {
  const { language } = useContext(LanguageContext);

  const advice = {
    "fr": "Pour répondre aux besoins nutritionnels des moutons, il est essentiel de leur fournir une alimentation équilibrée et variée. Assurez-vous de leur offrir un mélange d'aliments essentiels tels que des végétaux, des céréales et des aliments composés riches en protéines, vitamines et minéraux. N'oubliez pas d'inclure également de l'herbe fraîche et des aliments verts pour favoriser la diversité nutritionnelle et améliorer leur santé. Il est recommandé de consulter un expert en nutrition animale pour ajuster le régime alimentaire en fonction de leurs besoins spécifiques.",
    "ar": "يجب توفير تغذية متوازنة ومتنوعة للأغنام لتلبية احتياجاتها الغذائية. تأكد من تقديم مزيج من المكونات الغذائية الأساسية مثل العلف النباتي والحبوب والأعلاف المركبة الغنية بالبروتين والفيتامينات والمعادن الضرورية. لا تنسى توفير الأعشاب الطازجة والأعلاف الخضراء لتعزيز التنوع الغذائي وتحسين صحة الأغنام. من المستحسن استشارة خبير في التغذية الحيوانية لضبط النظام الغذائي وفقًا لاحتياجاتها الدقيقة."
  }
  const videoId = 'H2V4R2REoOw';
  const isMobileView = window.innerWidth < 768; 
  const opts = {
    height: isMobileView ? '240' : '460',
    width: isMobileView ? '300' : '540',
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <section className="testimonial">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <div className="testimonial__text">
              <span className="icon_quotations"></span>
              <p>“{advice[language]}”
              </p>
              <div className="testimonial__author">
                {/* <div className="testimonial__author__pic">
                  <img src="img/about/testimonial-author.jpg" alt="" />
                </div> */}
                {/* <div className="testimonial__author__text">
                  <h5>{language === "fr" ? "Dr. Mohamed Mbarki" : "الدكتور محمد المباركي"}</h5>
                  <p>{language === "fr" ? "Vétérinaire" : "طبيب بيطري"}</p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="video-container">
              <YouTube videoId={videoId} opts={opts} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
