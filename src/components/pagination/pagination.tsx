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
    setCurrentPage(selectPage);
    updateURLParameter(OptionUrl.PAGE, selectPage.toString(), navigate);
  }, [selectPage]);

  useEffect(() => {
    if (urlOptionsPage !== null) {
      if (+urlOptionsPage > 3) {
        const listCountPage = [...Array(totalPages).keys()].map((i) => i + 1);
        const startIndexPage = +urlOptionsPage - visibleSizePaginationPage;
        setStartIndex(+urlOptionsPage - visibleSizePaginationPage);
        setTimeout(() => {
          setDisplayedPages(listCountPage.slice(startIndexPage, startIndexPage + visibleSizePaginationPage));
        }, 1000);
      }
      setCurrentPage(+urlOptionsPage);
      setTimeout(() => {
        dispatch(catalogActions.selectPage({page: +urlOptionsPage}));
      }, 1000);
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
      const newCurrentPage = Math.max(...displayedPages) + 1;
      const copyDisplayedPages = originalArray.slice(startIndex + 1, startIndex + 1 + visibleSizePaginationPage);
      if (newCurrentPage === originalArray[originalArray.length - 1] || newCurrentPage === originalArray[originalArray.length - 2]) {
        setStartIndex(newCurrentPage - 3);
      } else {
        setStartIndex(newCurrentPage - 1);
      }
      setDisplayedPages(copyDisplayedPages);
      setCurrentPage(newCurrentPage);
      updateURLParameter(OptionUrl.PAGE, newCurrentPage.toString(), navigate);
      dispatch(catalogActions.selectPage({page: newCurrentPage}));
    }
  };

  const onBackSelectPageClick = () => {
    if (displayedPages[0] !== originalArray[0]) {
      const newStartPage = Math.min(...displayedPages) - 1;
      setStartIndex(newStartPage - 1);
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
    // console.log(page, displayedPages)
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
