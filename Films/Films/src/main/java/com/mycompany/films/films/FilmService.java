package com.mycompany.films.films;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilmService {

    private final FilmRepository filmRepository;

    @Autowired
    public FilmService(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    // Get all films
    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    // Get a specific film by its ID
    public Film getFilmById(Long id) {
        Optional<Film> optionalFilm = filmRepository.findById(id);
        return optionalFilm.orElse(null);
    }

    public List<Film> getAllActiveFilms() {
        return filmRepository.findByEtat("Active");
    }
    public  List<Film> getAllDesactiveFilms() {
        return filmRepository.findByEtat("Desactiver");
    }
    @Transactional
    public void desactiverFilm(Long filmId) {
        filmRepository.updateEtatById(filmId, "Desactiver");
    }
    // Create a new film

    @Transactional
    public void activerFilm(Long filmId) {filmRepository.updateEtatById(filmId,"Active");}
    public Film saveFilm(Film film) {
        return filmRepository.save(film);
    }

    // Update an existing film
    public Film updateFilm(Long id, Film updatedFilm) {
        Optional<Film> optionalFilm = filmRepository.findById(id);
        if (optionalFilm.isPresent()) {
            Film existingFilm = optionalFilm.get();
            existingFilm.setNomFilm(updatedFilm.getNomFilm());
            existingFilm.setDescFilm(updatedFilm.getDescFilm());
            existingFilm.setDescFilm(updatedFilm.getImgFilm());
            return filmRepository.save(existingFilm);
        } else {
            return null;
        }
    }

    // Delete a film by its ID
    public void deleteFilm(Long id) {
        filmRepository.deleteById(id);
    }
}
