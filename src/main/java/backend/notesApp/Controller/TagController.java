package backend.notesApp.Controller;

import backend.notesApp.Model.Tag;
import backend.notesApp.Model.User;
import backend.notesApp.Service.TagService;
import backend.notesApp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tag")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TagController {

    @Autowired
    private TagService tagService;
    @Autowired
    private UserService userService;

@GetMapping
public ResponseEntity<List<Tag>> findAll(@AuthenticationPrincipal UserDetails userDetails) {
    User user = userService.findByUsername(userDetails.getUsername());
    List<Tag> tagList = tagService.findAllByUser(user);
    return ResponseEntity.ok(tagList);
}

    @GetMapping("/{id}")
    public ResponseEntity<Tag> findById(@PathVariable Long id){
        return ResponseEntity.ok(tagService.findById(id));
    }


@PostMapping
public ResponseEntity<Tag> save(@RequestBody Tag tag, @AuthenticationPrincipal UserDetails userDetails) {
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(tagService.save(tag, userDetails.getUsername()));
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        tagService.delete(id);
        return ResponseEntity.noContent().build();
    }


@PutMapping("/{id}")
public ResponseEntity<Tag> updateTag(@PathVariable Long id, @RequestBody Tag tagDetails, @AuthenticationPrincipal UserDetails userDetails) {
    User user = userService.findByUsername(userDetails.getUsername());

    Tag tag = tagService.findById(id);

    if (!tag.getUser().equals(user)) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot edit this tag");
    }

    tag.setName(tagDetails.getName());
    Tag updatedTag = tagService.save(tag, user.getUsername());

    return ResponseEntity.ok(updatedTag);
}
}
