<?php

namespace App\Http\Controllers;

use App\Models\ChequierModel;
use Illuminate\Http\Request;

class ChequierController extends Controller
{
    function addDemandeChequier(Request $request)
    {
        $chequierModel = new ChequierModel();
        $fields = $request->validate([
            'chq_vcode_banque' => ['required'],
            'chq_vcode_agence' => ['required'],
            'chq_vcode_compte' => ['required'],
            'chq_vtype_compte' => ['required'],
            'chq_vrib' => ['required'],
            'chq_vcode_cli' => ['required'],
            'chq_vnom_client' => ['required'],
            'chq_vadresse_client' => ['required'],
            'chq_vquartier_client' => ['required'],
            'chq_vcommune_client' => ['required'],
            'chq_vtype_carnet' => ['required'],
            'chq_inombre_carnet' => ['required'],
            'chq_ireste' => ['required'],
            'chq_vtype_chequier' => ['required'],
            'chq_vmoyen_livraison' => ['required'],
            'chq_vagence_recup' => ['required']
        ]);
        return response($chequierModel->addDemandeChequier($fields));
        // return 'oh';
    }
    function deleteDemandeChequier($id = null){
        $chequierModel = new ChequierModel();
        $chequierModel->deleteDemandeChequier($id);
    }
    function getDemandesChequier($id = null){
        $chequierModel = new ChequierModel();
        return response($chequierModel->getDemandesChequier($id));
    }
    function getTypeCarnet(){
        $chequierModel = new ChequierModel();
        return response($chequierModel->getTypeCarnet());
    }
    function getTypeChequier(){
        $chequierModel = new ChequierModel();
        return response($chequierModel->getTypeChequier());
    }

    function getDemandesChequierByCompte($compteId){
        $chequierModel = new ChequierModel();
        return response($chequierModel->getDemandesChequierByCompte($compteId));
    }
}
