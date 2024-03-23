package com.mycompany.films.commentaire;

import jakarta.persistence.*;

@Entity
@Table(name = "commentaire")
public class Commentaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_commentaire;

    @Column(name = "commentaire")
    private String commentaire;

    @Column(name = "id_film")
    private Long idFilm;

    @Column(name = "idcompte")
    private Long idCompte;

    public Commentaire() {
    }

    public Long getId_commentaire() {
        return id_commentaire;
    }

    public void setId_commentaire(Long id_commentaire) {
        this.id_commentaire = id_commentaire;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public Long getIdFilm() {
        return idFilm;
    }

    public void setIdFilm(Long idFilm) {
        this.idFilm = idFilm;
    }

    public Long getIdCompte() {
        return idCompte;
    }

    public void setIdCompte(Long idCompte) {
        this.idCompte = idCompte;
    }
}
