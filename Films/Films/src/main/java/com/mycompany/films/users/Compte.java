package com.mycompany.films.users;

import jakarta.persistence.*;

@Entity
@Table(name = "compte")
public class Compte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcompte")
    private Long idCompte;

    @Column(name = "mail")
    private String mail;

    @Column(name = "password")
    private String password;



    public Compte() {
    }

    public Compte(String mail, String password) {
        this.mail = mail;
        this.password = password;
    }

    public Long getIdCompte() {
        return idCompte;
    }

    public void setIdCompte(Long idCompte) {
        this.idCompte = idCompte;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    @Override
    public String toString() {
        return "Compte{" +
                "idCompte=" + idCompte +
                ", mail='" + mail + '\'' +
                '}';
    }
}
