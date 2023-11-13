import React, {useContext} from 'react'
import YouTube from 'react-youtube';
import { LanguageContext } from '../LanguageContext';

export default function AdviceVaccin() {
  const { language } = useContext(LanguageContext);

  const advice = {
    "fr": "La vaccination des moutons est essentielle pour prévenir les maladies et assurer leur santé. Consultez un vétérinaire spécialisé en ovins pour élaborer un programme de vaccination adapté à vos moutons. Assurez-vous de respecter les calendriers de vaccination recommandés et de suivre les directives spécifiques pour chaque vaccin. La vaccination régulière aidera à renforcer le système immunitaire des moutons et à réduire les risques de maladies infectieuses.",
    "ar": "تطعيم الأغنام أمر ضروري للوقاية من الأمراض وضمان صحتها. استشر طبيب بيطري متخصص في الأغنام لوضع برنامج تطعيم مناسب لأغنامك. تأكد من احترام جداول التطعيم الموصى بها واتباع التوجيهات الخاصة بكل لقاح. يساعد التطعيم المنتظم في تعزيز جهاز المناعة لدى الأغنام وتقليل مخاطر الأمراض المعدية."
  };
  const videoId = '0cV4f5VdC8o';
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
