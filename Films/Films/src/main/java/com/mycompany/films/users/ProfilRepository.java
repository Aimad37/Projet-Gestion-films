package com.mycompany.films.users;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfilRepository extends JpaRepository<Profil, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Profil p SET p.role = 'a' WHERE p.idProfil = ?1")
    void adminProfil(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Profil p SET p.role = 'u' WHERE p.idProfil = ?1")
    void userProfil(Long id);
}
