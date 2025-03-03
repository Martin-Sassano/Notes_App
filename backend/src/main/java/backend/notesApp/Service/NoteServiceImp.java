package backend.notesApp.Service;

import backend.notesApp.Exception.NoteNotFoundException;
import backend.notesApp.Model.Note;
import backend.notesApp.Model.Tag;
import backend.notesApp.Model.User;
import backend.notesApp.Repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class NoteServiceImp implements NoteService{

    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private TagService tagService;

    @Override
    public List<Note> findNotesByUserId(Long userId) {
        return noteRepository.findByUserId(userId);
    }
    @Override
    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    @Override
    public Note findById(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException("Note with ID: " + id + " not found."));
    }

    @Override
    public Note save(Note note) {
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());
        note.setArchived(false);
        return noteRepository.save(note);
    }

    @Override
    public void delete(Long id) {
        Note note = findById(id);
        noteRepository.delete(note);
    }


@Override
public Note update(Long id, Note note) {
    Note existingNote = findById(id);

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User currentUser = userService.findByUsername(authentication.getName());

    Set<Tag> managedTags = new HashSet<>();
    for (Tag tag : note.getTags()) {
        managedTags.add(tagService.findById(tag.getId()));
    }

    existingNote.setTitle(note.getTitle());
    existingNote.setContent(note.getContent());
    existingNote.setArchived(note.isArchived());
    existingNote.setTags(managedTags);
    existingNote.setUpdatedAt(LocalDateTime.now());

    return noteRepository.save(existingNote);
}
}
