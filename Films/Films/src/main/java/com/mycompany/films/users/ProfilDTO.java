package com.mycompany.films.users;

public class ProfilDTO {
    private Long idProfil;
    private String username;
    private String prenom;
    private String mail;
    private String role;
    private Long idCompte;

    // Constructeur
    public ProfilDTO(Long idProfil, String username, String prenom, String mail, String role, Long idCompte) {
        this.idProfil = idProfil;
        this.username = username;
        this.prenom = prenom;
        this.mail = mail;
        this.role = role;
        this.idCompte = idCompte;
    }

    // Getters and setters
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
