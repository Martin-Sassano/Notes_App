package backend.notesApp.Controller;

import backend.notesApp.Model.Note;
import backend.notesApp.Model.User;
import backend.notesApp.Service.NoteService;
import backend.notesApp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/v1/note")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NoteController {

    @Autowired
    private NoteService noteService;
    @Autowired
    private UserService userService;

    @GetMapping("/{uid}")
    public ResponseEntity<List<Note>> findNotesByUserId(@PathVariable Long uid) {
        User user = userService.findById(uid);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Note> noteList = noteService.findNotesByUserId(uid);
        return ResponseEntity.ok(noteList);
    }
    @GetMapping("/n/{id}")
    public ResponseEntity<Note> findById(@PathVariable Long id){
        return ResponseEntity.ok(noteService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Note> save(@RequestBody Note note, Authentication authentication) {

        String username = authentication.getName();

        User user = userService.findByUsername(username);

        note.setUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(noteService.save(note));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        noteService.delete(id);
       return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> update(@PathVariable Long id, @RequestBody Note note){
        Note update = noteService.update(id, note);
        update.setTags(new HashSet<>(update.getTags()));
        return ResponseEntity.ok(update);
    }

}
