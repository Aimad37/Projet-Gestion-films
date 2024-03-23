package com.mycompany.films.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompteService {

    private final CompteRepository compteRepository;

    @Autowired
    public CompteService(CompteRepository compteRepository) {
        this.compteRepository = compteRepository;
    }

    public List<Compte> getAllComptes() {
        return compteRepository.findAll();
    }

    public Optional<Compte> getCompteById(Long id) {
        return compteRepository.findById(id);
    }

    public Compte saveCompte(Compte compte) {
        return compteRepository.save(compte);
    }

    public void deleteCompte(Long id) {
        compteRepository.deleteById(id);
    }

    public Compte updateCompte(Long id, Compte updatedCompte) {
        Optional<Compte> existingCompteOptional = compteRepository.findById(id);
        if (existingCompteOptional.isPresent()) {
            Compte existingCompte = existingCompteOptional.get();
            existingCompte.setMail(updatedCompte.getMail());
            existingCompte.setPassword(updatedCompte.getPassword());
            return compteRepository.save(existingCompte);
        } else {
            throw new IllegalArgumentException("Compte with id " + id + " not found");
        }
    }
}
