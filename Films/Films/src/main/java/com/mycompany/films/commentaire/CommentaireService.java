package com.mycompany.films.commentaire;

import com.mycompany.films.FilmAvecCommentaireDTO;
import com.mycompany.films.films.Film;
import com.mycompany.films.films.FilmRepository;
import org.antlr.v4.runtime.tree.pattern.ParseTreePattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentaireService {

    private final CommentaireRepository commentaireRepository;
    private final FilmRepository filmRepository;

    @Autowired
    public CommentaireService(CommentaireRepository commentaireRepository, FilmRepository filmRepository) {
        this.commentaireRepository = commentaireRepository;
        this.filmRepository = filmRepository;
    }

    public List<Commentaire> getAllCommentaires() {
        return commentaireRepository.findAll();
    }

    public List<FilmAvecCommentaireDTO> getFilmsAvecCommentaires() {
        // Récupérer tous les films
        List<Film> films = filmRepository.findAll();

        // Pour chaque film, récupérer ses commentaires et créer un DTO FilmAvecCommentaireDTO
        return films.stream()
                .map(film -> {
                    List<Commentaire> commentaires = commentaireRepository.findByIdFilm(film.getId());
                    return new FilmAvecCommentaireDTO(film, commentaires);
                })
                .collect(Collectors.toList());
    }
    public Commentaire addCommentaire(Commentaire commentaire) {
        return commentaireRepository.save(commentaire);
    }

    public void deleteCommentaire(Long id) {
        commentaireRepository.deleteById(id);
    }

    public Commentaire updateCommentaire(Long id, Commentaire newCommentaire) {
        Commentaire existingCommentaire = commentaireRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Commentaire not found for id: " + id));

        existingCommentaire.setCommentaire(newCommentaire.getCommentaire());
        // Vous pouvez également mettre à jour les références vers les films et les comptes si nécessaire
        // existingCommentaire.setFilm(newCommentaire.getFilm());
        // existingCommentaire.setCompte(newCommentaire.getCompte());

        return commentaireRepository.save(existingCommentaire);
    }
}
