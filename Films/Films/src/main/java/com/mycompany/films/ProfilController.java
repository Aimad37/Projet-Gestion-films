package com.mycompany.films;

import com.mycompany.films.users.Compte;
import com.mycompany.films.users.Profil;
import com.mycompany.films.users.ProfilDTO;
import com.mycompany.films.users.ProfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/profils")
public class ProfilController {

    private final ProfilService profilService;
    private final CompteController compteService;

    @Autowired
    public ProfilController(ProfilService profilService, CompteController compteService) {
        this.profilService = profilService;
        this.compteService = compteService;
    }

    @GetMapping("/recuperer_liste_profils")
    public ResponseEntity<List<Profil>> getAllProfils() {
        List<Profil> profils = profilService.getAllProfils();
        return new ResponseEntity<>(profils, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfilDTO> getProfilById(@PathVariable Long id) {
        Optional<Profil> profilOptional = profilService.getProfilById(id);
        return profilOptional.map(profil -> {
            ProfilDTO profilDTO = new ProfilDTO(
                    profil.getIdProfil(),
                    profil.getUsername(),
                    profil.getPrenom(),
                    profil.getMail(),
                    profil.getRole(),
                    profil.getIdCompte()
            );
            return new ResponseEntity<>(profilDTO, HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PostMapping("/enregistrer_user")
    public ResponseEntity<Profil> saveProfil(@RequestBody Profil profil) {
        Profil savedProfil = profilService.saveProfil(profil);
        return new ResponseEntity<>(savedProfil, HttpStatus.CREATED);
    }

    @PutMapping("/changer_role_profil/{id}")
    public ResponseEntity<String>  changer_role_profil(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String role = body.get("role");
        if(role.equals("a")){
            profilService.userProfil(id);
            return ResponseEntity.ok("Le rôle du profil a été changé en 'utilisateur' avec succès");
        }else{
            profilService.adminProfil(id);
            return ResponseEntity.ok("Le rôle du profil a été changé en 'administrateur' avec succès");
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<Profil> updateProfil(@PathVariable Long id, @RequestBody Profil updatedProfil) {
        Profil updated = profilService.updateProfil(id, updatedProfil);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/supprimer_profil/{id}")
    public ResponseEntity<Void> deleteProfil(@PathVariable Long id) {
        Optional<Profil> profilOptional = profilService.getProfilById(id);
        if (profilOptional.isPresent()) {
            Profil profil = profilOptional.get();
            Long idCompte = profil.getIdCompte();
            if (idCompte != null) { // Vérifiez si l'ID du compte associé existe
                // Supprimez d'abord le profil
                profilService.deleteProfil(profil.getIdProfil());
                // Ensuite, supprimez le compte associé
                compteService.deleteCompte(idCompte);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}
