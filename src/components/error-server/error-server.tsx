import { TextError } from '../../const';
import '../error-server/error-server-style.css';

export default function ErrorServer() {
  return (
    <div className='error'>
      <div className="error__content">
        <img className='error__fon' src="img/content/error-server.png" alt="" />
        <p className='error__text'>{TextError.SERVER}</p>
      </div>
    </div>);
}
