package com.mycompany.films;

import com.mycompany.films.commentaire.Commentaire;
import com.mycompany.films.films.Film;

import java.util.List;

public class FilmAvecCommentaireDTO {
    private Film film;
    private List<Commentaire> commentaires;

    public FilmAvecCommentaireDTO() {
    }

    public FilmAvecCommentaireDTO(Film film, List<Commentaire> commentaires) {
        this.film = film;
        this.commentaires = commentaires;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }

    public List<Commentaire> getCommentaires() {
        return commentaires;
    }

    public void setCommentaires(List<Commentaire> commentaires) {
        this.commentaires = commentaires;
    }
}
