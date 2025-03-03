package backend.notesApp.Service;

import backend.notesApp.Exception.TagNotFoundException;
import backend.notesApp.Model.Tag;
import backend.notesApp.Model.User;
import backend.notesApp.Repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImp implements TagService{

    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private UserService userService;

    @Override
    public List<Tag> findAll() {
        return tagRepository.findAll();
    }

    @Override
    public Tag findById(Long id) {
        return tagRepository.findById(id).orElseThrow(() -> new TagNotFoundException("Tag with ID: " + id + " not found."));
    }


@Override
public Tag save(Tag tag, String username) {
    User user = userService.findByUsername(username);
    if (tagRepository.findByNameAndUser(tag.getName(), user).isPresent()) {
        throw new IllegalArgumentException("Tag already exist for this user.");
    }
    tag.setUser(user);
    return tagRepository.save(tag);
}
    @Override
    public void delete(Long id) {
        Tag tag = findById(id);
        tagRepository.delete(tag);
    }

    @Override
    public Tag update(Long id, Tag tag) {
        Tag tagToUpdate = findById(id);
        tagToUpdate.setName(tag.getName());
        return tagRepository.save(tagToUpdate);
    }

    @Override
    public List<Tag> findAllByUser(User user) {
        return tagRepository.findByUser(user);
    }
}
