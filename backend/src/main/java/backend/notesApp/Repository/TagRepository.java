package backend.notesApp.Repository;

import backend.notesApp.Model.Tag;
import backend.notesApp.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByNameAndUser(String name, User user);
    List<Tag> findByUser(User user);
}
