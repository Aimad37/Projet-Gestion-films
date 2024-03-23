package com.mycompany.films.users;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompteRepository extends JpaRepository<Compte, Long> {
    // Ajoutez ici les méthodes de requête personnalisées si nécessaire
}
