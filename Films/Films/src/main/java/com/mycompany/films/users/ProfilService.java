package com.mycompany.films.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfilService {

    private final ProfilRepository profilRepository;

    @Autowired
    public ProfilService(ProfilRepository profilRepository) {
        this.profilRepository = profilRepository;
    }

    public List<Profil> getAllProfils() {
        return profilRepository.findAll();
    }

    public Optional<Profil> getProfilById(Long id) {
        return profilRepository.findById(id);
    }

    public Profil saveProfil(Profil profil) {
        return profilRepository.save(profil);
    }

    public void deleteProfil(Long id) {
        profilRepository.deleteById(id);
    }

    public void adminProfil(Long id) {profilRepository.adminProfil(id);}

    public void userProfil(Long id) {profilRepository.userProfil(id);}

    public Profil updateProfil(Long id, Profil updatedProfil) {
        Optional<Profil> existingProfilOptional = profilRepository.findById(id);
        if (existingProfilOptional.isPresent()) {
            Profil existingProfil = existingProfilOptional.get();
            existingProfil.setUsername(updatedProfil.getUsername());
            existingProfil.setPrenom(updatedProfil.getPrenom());
            existingProfil.setMail(updatedProfil.getMail());
            existingProfil.setRole(updatedProfil.getRole());
            return profilRepository.save(existingProfil);
        } else {
            throw new IllegalArgumentException("Profil with id " + id + " not found");
        }
    }
}
