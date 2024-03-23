package com.mycompany.films.films;

import com.mycompany.films.users.Compte;

import jakarta.persistence.*;

@Entity
@Table(name = "film")
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_film")
    private Long id;

    @Column(name = "nom_film")
    private String nomFilm;

    @Column(name = "desc_film")
    private String descFilm;

    @Column(name = "img_film")
    private String imgFilm;

    // Clé étrangère vers la table des comptes
    @Column(name = "idcompte")
    private Long idCompte; // Référence à l'ID du compte associé

    @Column(name = "etat")
    private String etat;

    public Film() {
    }

    public String getNomFilm() {
        return nomFilm;
    }

    public void setNomFilm(String nomFilm) {
        this.nomFilm = nomFilm;
    }

    public String getDescFilm() {
        return descFilm;
    }

    public void setDescFilm(String descFilm) {
        this.descFilm = descFilm;
    }

    public String getImgFilm() {
        return imgFilm;
    }

    public void setImgFilm(String imgFilm) {
        this.imgFilm = imgFilm;
    }


    public Long getIdCompte() {
        return idCompte;
    }

    public void setIdCompte(Long idCompte) {
        this.idCompte = idCompte;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Film(String nomFilm) {
        this.nomFilm = nomFilm;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Film{" +
                "id=" + id +
                ", nomFilm='" + nomFilm + '\'' +
                '}';
    }
}
