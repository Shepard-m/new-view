import { Link } from 'react-router-dom';
import './not-found-page-style.css';
import { AppRoute } from '../../const';
export default function NotFoundPage() {
  return (
    <div className="container-not-page" data-testid={'not-found-page'}>
      <h1 className="first-four">4</h1>
      <div className="cog-wheel1">
        <div className="cog1">
          <div className="top" />
          <div className="down" />
          <div className="left-top" />
          <div className="left-down" />
          <div className="right-top" />
          <div className="right-down" />
          <div className="left" />
          <div className="right" />
        </div>
      </div>
      <div className="cog-wheel2">
        <div className="cog2">
          <div className="top" />
          <div className="down" />
          <div className="left-top" />
          <div className="left-down" />
          <div className="right-top" />
          <div className="right-down" />
          <div className="left" />
          <div className="right" />
        </div>
      </div>
      <h1 className="second-four">4</h1>
      <p className="wrong-para">
        Uh Oh! Page not found! <br />
        <br />
        <Link to={AppRoute.CATALOG} style={{ color: 'orange', fontSize: 28 }}>
          Перейти на главную страницу
        </Link>
      </p>
    </div>
  );
}
