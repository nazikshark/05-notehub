import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
  forcePage: number;
}

const Pagination = ({ pageCount, onPageChange, forcePage }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={(data) => onPageChange(data.selected + 1)}
      forcePage={forcePage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
    />
  );
};

export default Pagination;