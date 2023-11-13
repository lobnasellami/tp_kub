import React, { useEffect } from 'react';
import $ from 'jquery';

export default function Preloader() {
  useEffect(() => {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");

    // Cleanup function to remove event listener
    return () => {
      $(window).off('hashchange');
    };
  }, []);

  $(window).on('hashchange', function() {
    $(".loader").fadeIn();
    $("#preloder").fadeIn("slow");
  });

  return (
    <div id="preloder">
      <div className="loader"></div>
    </div>
  );
}
