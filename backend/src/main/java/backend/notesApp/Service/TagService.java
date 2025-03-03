package backend.notesApp.Service;

import backend.notesApp.Model.Tag;
import backend.notesApp.Model.User;

import java.util.List;

public interface TagService {
    List<Tag>findAll();
    Tag findById(Long id);
    Tag save(Tag tag, String username);
    void delete(Long id);
    Tag update(Long id, Tag tag);
    List<Tag> findAllByUser(User user); ///
}
