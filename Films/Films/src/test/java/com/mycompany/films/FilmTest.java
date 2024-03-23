package com.mycompany.films;

import com.mycompany.films.films.Film;
import com.mycompany.films.films.FilmRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class FilmTest {

    @Autowired
    private FilmRepository filmRepository;

    @Test
    public void testRecupererTousLesFilms() {
        // Insérer des films fictifs dans la base de données pour les tester
        Film film1 = new Film("NomFilm1");
        Film film2 = new Film("NomFilm2");
        filmRepository.save(film1);
        filmRepository.save(film2);

        // Récupérer tous les films depuis la base de données
        Iterable<Film> films = filmRepository.findAll();

        // Vérifier si la liste des films n'est pas vide
        assertThat(films).isNotEmpty();

        // Afficher les films récupérés
        for (Film film : films) {
            System.out.println(film);
        }
    }
}
