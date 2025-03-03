package backend.notesApp.Service;

import backend.notesApp.Model.User;

public interface UserService {
    User registerUser(String username, String password);
    User findByUsername(String username);
    User findById(Long id);

}
