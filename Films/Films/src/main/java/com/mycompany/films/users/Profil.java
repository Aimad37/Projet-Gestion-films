package com.mycompany.films.users;

import jakarta.persistence.*;

@Entity
@Table(name = "profil")
public class Profil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_profil")
    private Long idProfil;

    @Column(name = "username")
    private String username;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "mail")
    private String mail;

    @Column(name = "role")
    private String role;

    @Column(name = "idcompte")
    private Long idCompte; // Référence à l'ID du compte associé

    public Profil(String username, String prenom, String mail, String role, Long idCompte) {
        this.username = username;
        this.prenom = prenom;
        this.mail = mail;
        this.role = role;
        this.idCompte = idCompte;
    }

    // Getters et setters

    public Profil() {
        // Constructeur par défaut nécessaire pour Hibernate
    }

    public Long getIdProfil() {
        return idProfil;
    }

    public void setIdProfil(Long idProfil) {
        this.idProfil = idProfil;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getIdCompte() {
        return idCompte;
    }

    public void setIdCompte(Long idCompte) {
        this.idCompte = idCompte;
    }
}
