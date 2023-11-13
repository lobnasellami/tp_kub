import React, {useContext} from 'react'
import YouTube from 'react-youtube';
import { LanguageContext } from '../LanguageContext';

export default function AdviceElevage() {
  const { language } = useContext(LanguageContext);

  const advice = {
    "fr": "L'éducation et les soins des moutons sont essentiels pour assurer leur bien-être et leur santé globale. Assurez-vous de leur fournir un environnement propre et sûr, avec un abri adéquat contre les intempéries. Veillez à leur donner une alimentation équilibrée et suffisante en fonction de leurs besoins nutritionnels. Il est également important de leur fournir un accès à de l'eau fraîche en tout temps. Effectuez régulièrement des examens de santé et consultez un vétérinaire pour des soins préventifs et des traitements en cas de maladie. Enfin, offrez-leur un environnement social en introduisant d'autres moutons ou en leur permettant de pâturer ensemble, favorisant ainsi leur bien-être mental et social.",
    "ar": "تربية ورعاية الأغنام أمران أساسيان لضمان رفاهيتها وصحتها العامة. تأكد من توفير بيئة نظيفة وآمنة لهم، مع مأوى مناسب لحمايتهم من العوامل الجوية. توفر لهم تغذية متوازنة وكافية وفقًا لاحتياجاتهم الغذائية. من المهم أيضًا توفير وصولهم إلى مياه نظيفة في جميع الأوقات. قم بإجراء فحوصات صحية بانتظام واستشر طبيب بيطري للحصول على الرعاية الوقائية والعلاجات في حالة الإصابة بمرض. أخيرًا، قدم لهم بيئة اجتماعية عن طريق إدخال ماعز آخرين أو السماح لهم بالرعي معًا، مما يعزز رفاهيتهم العقلية والاجتماعية."
  };
  const videoId = 'lcJ3N_PmzV0';

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
