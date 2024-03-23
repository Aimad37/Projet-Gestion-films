package com.mycompany.films;

import com.mycompany.films.films.Film;
import com.mycompany.films.films.FilmDTO;
import com.mycompany.films.films.FilmService;
import com.mycompany.films.users.Profil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/films")
public class FilmController {

    private final FilmService filmService;

    @Autowired
    public FilmController(FilmService filmService) {
        this.filmService = filmService;
    }

    // Get all films
    @GetMapping
    public ResponseEntity<List<Film>> getAllFilms() {
        List<Film> films = filmService.getAllFilms();
        return new ResponseEntity<>(films, HttpStatus.OK);
    }

    @GetMapping("/recuperer_liste")
    public ResponseEntity<List<Film>> recupererListeFilms() {
        List<Film> films = filmService.getAllFilms();
        return new ResponseEntity<>(films, HttpStatus.OK);
    }

    @GetMapping("/recuperer_liste_active")
    public ResponseEntity<List<Film>> recupererListeFilmsActive() {
        List<Film> films = filmService.getAllActiveFilms();
        return new ResponseEntity<>(films, HttpStatus.OK);
    }


    @GetMapping("/recuperer_liste_desactive")
    public ResponseEntity<List<Film>> recupererListeFilmsDesactive() {
        List<Film> films = filmService.getAllDesactiveFilms();
        return new ResponseEntity<>(films, HttpStatus.OK);
    }
    @PutMapping("/desactiver_film/{filmId}")
    public void desactiver_film(@PathVariable Long filmId) {
        filmService.desactiverFilm(filmId);
    }
    // Get a specific film by its ID

    @PutMapping("/activer_film/{filmId}")
    public void activer_film(@PathVariable Long filmId) {filmService.activerFilm(filmId);}

    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable("id") Long id) {
        Film film = filmService.getFilmById(id);
        return film != null ? new ResponseEntity<>(film, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Create a new film
    @PostMapping("/ajouter_film")
    public ResponseEntity<Film> saveFilm(@RequestBody Film film) {
        Film savedFilm = filmService.saveFilm(film);
        return new ResponseEntity<>(savedFilm, HttpStatus.CREATED);
    }

    // Update an existing film
    @PutMapping("/{id}")
    public ResponseEntity<Film> updateFilm(@PathVariable("id") Long id, @RequestBody Film film) {
        Film updatedFilm = filmService.updateFilm(id, film);
        return updatedFilm != null ? new ResponseEntity<>(updatedFilm, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete a film by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilm(@PathVariable("id") Long id) {
        filmService.deleteFilm(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
