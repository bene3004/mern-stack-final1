import { useMemo } from 'react';

function NoteList({ notes, filter }) {
  const filteredNotes = useMemo(() => {
    return notes.filter(note => note.heading.toLowerCase().includes(filter.toLowerCase()));
  }, [notes, filter]);

  return (
    <ul>
      {filteredNotes.map(note => (
        <li key={note._id}>{note.heading}</li>
      ))}
    </ul>
  );
}

export default NoteList;