import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes, createNote, deleteNote } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

// @ts-ignore
import 'modern-normalize';
import css from './App.module.css';

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const queryClient = useQueryClient();

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, 12, search),
    retry: false,
  });

  const addNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={(e) => handleSearch(e.target.value)} />
        {data && data.totalPages > 1 && (
          <Pagination pageCount={data.totalPages} onPageChange={setPage} forcePage={page} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error!</p>}
        {data && data.notes.length > 0 && (
          <NoteList notes={data.notes} onDelete={(id) => deleteNoteMutation.mutate(id)} />
        )}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm 
            onCancel={() => setIsModalOpen(false)} 
            onSubmit={(values) => addNoteMutation.mutate(values)} 
          />
        </Modal>
      )}
    </div>
  );
};

export default App;