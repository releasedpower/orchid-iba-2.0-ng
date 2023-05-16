<?php

namespace App\Http\Controllers;

use App\Models\BeneficiaireModel;
use Illuminate\Http\Request;

class BeneficiaireController extends Controller
{
    function addBeneficiaire(Request $request){
        $beneficiaire= new BeneficiaireModel();
        $fields = $request->validate([
            'benNom' => ['required'],
            'benPrenom' => ['required'],
            'benBanqueCode' => ['required'],
            'benAgenceCode' => ['required'],
            'benCompteCode' => ['required'],
            'benRib' => ['required'],
            'benClientCode' => ['required']
        ]);
        return response($beneficiaire->addBeneficiaire($fields));
    }
    function deleteBeneficiaire($id = null){
        $beneficiaire = new BeneficiaireModel();
        $beneficiaire->deleteBeneficiaire($id);
    }
    function searchBeneficiaire($term,$userId){
        $beneficiaire = new BeneficiaireModel();
        return response($beneficiaire->searchBeneficiaire($term,$userId));
    }
    function getBeneficiaireById($benIndex){
        $beneficiaire = new BeneficiaireModel();
        return response($beneficiaire->getBeneficiaireById($benIndex));
    }
}
