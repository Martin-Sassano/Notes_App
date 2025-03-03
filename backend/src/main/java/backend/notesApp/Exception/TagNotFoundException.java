package backend.notesApp.Exception;


public class TagNotFoundException extends RuntimeException{
    public TagNotFoundException(String message) {
        super(message);
    }
}
