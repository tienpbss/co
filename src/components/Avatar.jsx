import Image from "react-bootstrap/Image";
import { defaultImg } from "src/constants";

function Avatar({ url, width }) {
  return <Image src={url || defaultImg} width={width || 30} roundedCircle />;
}

export default Avatar;
