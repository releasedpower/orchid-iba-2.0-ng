<?php

namespace App\Http\Controllers;

use App\Models\OppositionModel;
use Illuminate\Http\Request;

class OppositionController extends Controller
{
    function getOppositionTypeCheque(){
        $oppositionModel = new OppositionModel();
        return response($oppositionModel->getOppositionTypeCheque());
    }

    function addOpposition(Request $request){
        $oppositionModel = new OppositionModel();
        return response($oppositionModel->addOpposition($request));
    }

    function getOppositionsByCompte($compteId){
        $oppositionModel = new OppositionModel();
        return response($oppositionModel->getOppositionsByCompte($compteId));
    }
}
 