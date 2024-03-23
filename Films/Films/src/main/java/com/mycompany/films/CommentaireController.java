package com.mycompany.films;

import com.mycompany.films.commentaire.Commentaire;
import com.mycompany.films.commentaire.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/commentaires")
public class CommentaireController {

    private final CommentaireService commentaireService;

    @Autowired
    public CommentaireController(CommentaireService commentaireService) {
        this.commentaireService = commentaireService;
    }

    @GetMapping
    public ResponseEntity<List<Commentaire>> getAllCommentaires() {
        List<Commentaire> commentaires = commentaireService.getAllCommentaires();
        return new ResponseEntity<>(commentaires, HttpStatus.OK);
    }

    @PostMapping("ajouter_commentaire")
    public ResponseEntity<Commentaire> addCommentaire(@RequestBody Commentaire commentaire) {
        Commentaire savedCommentaire = commentaireService.addCommentaire(commentaire);
        return new ResponseEntity<>(savedCommentaire, HttpStatus.CREATED);
    }
    @GetMapping("/films_avec_commentaires")
    public ResponseEntity<List<FilmAvecCommentaireDTO>> getFilmsAvecCommentaires() {
        List<FilmAvecCommentaireDTO> filmsAvecCommentaires = commentaireService.getFilmsAvecCommentaires();
        return ResponseEntity.ok(filmsAvecCommentaires);
    }
    @DeleteMapping("/supprimer_commentaire/{id}")
    public ResponseEntity<Void> deleteCommentaire(@PathVariable Long id) {
        commentaireService.deleteCommentaire(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Commentaire> updateCommentaire(@PathVariable Long id, @RequestBody Commentaire commentaire) {
        Commentaire updatedCommentaire = commentaireService.updateCommentaire(id, commentaire);
        return new ResponseEntity<>(updatedCommentaire, HttpStatus.OK);
    }
}
