package com.mycompany.films.films;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {


    @Query("SELECT f FROM Film f WHERE f.etat = :etat")
    List<Film> findByEtat(String etat);

    @Modifying
    @Query("UPDATE Film f SET f.etat = :etat WHERE f.id = :filmId")
    void updateEtatById(@Param("filmId") Long filmId, @Param("etat") String etat);

}
