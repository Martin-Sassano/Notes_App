package backend.notesApp.Service;

import backend.notesApp.Model.Note;

import java.util.List;

public interface NoteService {
    List<Note>findAll();
    Note findById(Long id);
    Note save(Note note);
    void delete(Long id);
    Note update(Long id, Note note);
    List<Note> findNotesByUserId(Long userId);
}
