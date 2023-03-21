import Contact from "./Contact";
import { Logos } from "./Logos";

function Footer() {
  return (
    <div className="container sm:flex sm:justify-between mt-16 sm:mt-24 mb-10">
      <Contact />
      <div className="flex flex-col justify-between">
        <div className="text-right hidden sm:block">
          <strong>Barnabás Várszegi</strong> <br />
          varszegibarnabas@gmail.com
        </div>
        <Logos />
      </div>
    </div>
  );
}

export default Footer;
