import { SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { currentPageSelectors, filterCamerasSelectors } from '../../store/slice/catalog/catalog-selectros';
import { OptionUrl, countCamerasForPage, visibleSizePaginationPage } from '../../const';
import { catalogActions } from '../../store/slice/catalog/catalog';
import { getURLParameter, updateURLParameter } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

export default function Pagination() {
  const selectPage = useAppSelector(currentPageSelectors);
  const cameras = useAppSelector(filterCamerasSelectors);
  const urlOptionsPage = getURLParameter(OptionUrl.PAGE);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(selectPage);
  const [startIndex, setStartIndex] = useState(0);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);

  let totalPages = 0;

  if (cameras !== null) {
    totalPages = Math.ceil(cameras?.length / countCamerasForPage);
  }

  useEffect(() => {
    if (urlOptionsPage !== null) {
      setCurrentPage(+urlOptionsPage);
      dispatch(catalogActions.selectPage({page: +urlOptionsPage}));
    } else {
      setCurrentPage(selectPage);
    }
  }, []);

  useEffect(() => {
    const listCountPage = [...Array(totalPages).keys()].map((i) => i + 1);
    setOriginalArray(listCountPage);
    if (listCountPage.length <= 3) {
      setDisplayedPages(listCountPage);
    } else {
      setDisplayedPages(listCountPage.slice(startIndex, startIndex + visibleSizePaginationPage));
    }

  }, [selectPage, totalPages]);

  const onNextSelectPageClick = () => {
    if (displayedPages[displayedPages.length - 1] < originalArray[originalArray.length - 1]) {
      const newStartPage = currentPage + 1;
      setStartIndex(startIndex + 1);
      setDisplayedPages(originalArray.slice(startIndex + 1, startIndex + 1 + visibleSizePaginationPage));
      setCurrentPage(newStartPage);
      updateURLParameter(OptionUrl.PAGE, newStartPage.toString(), navigate);
      dispatch(catalogActions.selectPage({page: newStartPage}));
    }
  };

  const onBackSelectPageClick = () => {
    if (displayedPages[0] !== originalArray[0]) {
      const newStartPage = currentPage - 1;
      setStartIndex(startIndex - 1);
      setDisplayedPages(originalArray.slice(startIndex - 1, startIndex - 1 + visibleSizePaginationPage));
      setCurrentPage(newStartPage);
      updateURLParameter(OptionUrl.PAGE, newStartPage.toString(), navigate);
      dispatch(catalogActions.selectPage({page: newStartPage}));
    }
  };

  const onSelectPageClick = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    if (evt.currentTarget.dataset.page === undefined) {
      return;
    }
    const page = +evt.currentTarget.dataset.page;

    setCurrentPage(page);
    setDisplayedPages(originalArray.slice(startIndex, startIndex + visibleSizePaginationPage));
    updateURLParameter(OptionUrl.PAGE, page.toString(), navigate);
    dispatch(catalogActions.selectPage({page}));
  };

  return (
    <div className="pagination" data-testid={'pagination'}>
      <ul className="pagination__list">
        {displayedPages[0] !== originalArray[0] && (
          <li className="pagination__item">
            <a className="pagination__link pagination__link--text" onClick={onBackSelectPageClick}>
              Назад
            </a>
          </li>
        )}
        {displayedPages.map((page) => (
          <li key={page} className="pagination__item">
            <a
              className={`pagination__link ${page === currentPage ? 'pagination__link--active' : ''}`}
              data-page={page}
              onClick={onSelectPageClick}
            >
              {page}
            </a>
          </li>
        ))}
        {displayedPages[2] < totalPages && (
          <li className="pagination__item">
            <a className="pagination__link pagination__link--text" onClick={onNextSelectPageClick}>
              Далее
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
