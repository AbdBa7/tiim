import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from '../service/service-common';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-tiim-data',
  templateUrl: './add-tiim-data.component.html',
  styleUrls: ['./add-tiim-data.component.scss']
})
export class AddTiimDataComponent implements OnInit {

  tiimDataForm: FormGroup;

  constructor(
    private common_service: CommonService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.tiimDataForm = this.formBuilder.group({
      // Matière nécessaire
      observations: "",
      pvc_resine: "",
      calcium_jorcal: "",
      tio2: "",
      wax_flakes: "",
      steric_acid: "",
      carbon_black: "",
      blue_pigment: "",
      matiere_recyclee: "",
      stabilizer_s_az: "",

      // Totale de matière en kg
      quantite_tuyau_prevue: '',
      quantit_tuyau_fabriquee: '',
      quantite_tuyau_supplementaire: '',
      dechets_recuperables: 0,
      dechet_non_recuperable: 0,
      dechet_non_recuperable_perc: 0,
      personnel_temporaire: '',
      
      date_et_heure_debut: '',
      date_et_heure_completee: '',
      date_de_livraison_de_la_commande: '',
      heures_supplementaires: '',

      // Groupe
      groupe_numero: '',
      consommation_en_gasoil: '',
      heures_de_demarrage: '',
      heures_arret: '',
      quantite_de_reserve_gasoil: ''
    });
  }
  forma_val: any;
  get f() { return this.tiimDataForm.controls; }

  addItem() {
    console.log("check");
    console.log(typeof this.forma_val);
    this.forma_val = {
      observations: this.f.observations.value,
      pvc_resine: this.f.pvc_resine.value,
      calcium_jorcal: this.f.calcium_jorcal.value,
      tio2: this.f.tio2.value,
      wax_flakes: this.f.wax_flakes.value,
      steric_acid: this.f.steric_acid.value,
      carbon_black: this.f.carbon_black.value,
      blue_pigment: this.f.blue_pigment.value,
      matiere_recyclee: this.f.matiere_recyclee.value,
      stabilizer_s_az: this.f.stabilizer_s_az.value,
    
      quantite_tuyau_prevue: this.f.quantite_tuyau_prevue.value,
      quantit_tuyau_fabriquee: this.f.quantit_tuyau_fabriquee.value,
      quantite_tuyau_supplementaire: this.f.quantite_tuyau_supplementaire.value,
      dechets_recuperables: this.f.dechets_recuperables.value,
      dechet_non_recuperable: this.f.dechet_non_recuperable.value,
      personnel_temporaire: this.f.personnel_temporaire.value,
    
      date_et_heure_debut: this.f.date_et_heure_debut.value,
      date_et_heure_completee: this.f.date_et_heure_completee.value,
      date_de_livraison_de_la_commande: this.f.date_de_livraison_de_la_commande.value,
      heures_supplementaires: this.f.heures_supplementaires.value,
    
      groupe_numero: this.f.groupe_numero.value,
      consommation_en_gasoil: this.f.consommation_en_gasoil.value,
      heures_de_demarrage: this.f.heures_de_demarrage.value,
      heures_arret: this.f.heures_arret.value,
      quantite_de_reserve_gasoil: this.f.quantite_de_reserve_gasoil.value
    }
    this.common_service.post('add_tiim_items', this.forma_val)
    .subscribe(res => {
      console.log({"res": res});
    });
  }
}
