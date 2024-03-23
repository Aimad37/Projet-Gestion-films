package com.mycompany.films;

import com.mycompany.films.users.Compte;
import com.mycompany.films.users.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comptes")
public class CompteController {

    private final CompteService compteService;

    @Autowired
    public CompteController(CompteService compteService) {
        this.compteService = compteService;
    }

    @GetMapping("/comptes")
    public ResponseEntity<List<Compte>> getAllComptes() {
        List<Compte> comptes = compteService.getAllComptes();
        return new ResponseEntity<>(comptes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compte> getCompteById(@PathVariable Long id) {
        Optional<Compte> compteOptional = compteService.getCompteById(id);
        return compteOptional.map(compte -> new ResponseEntity<>(compte, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/enregistrer_user")
    public ResponseEntity<Compte> saveCompte(@RequestBody Compte compte) {
        Compte savedCompte = compteService.saveCompte(compte);
        return new ResponseEntity<>(savedCompte, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Compte> updateCompte(@PathVariable Long id, @RequestBody Compte updatedCompte) {
        Compte updated = compteService.updateCompte(id, updatedCompte);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompte(@PathVariable Long id) {
        compteService.deleteCompte(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
