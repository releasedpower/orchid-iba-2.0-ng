<?php

namespace App\Http\Controllers;

use App\Models\VirementModel;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class VirementController extends Controller
{
    function addVirement(Request $request){
        $virementModel = new VirementModel();
        $fields = $request->validate([
            'vir_vcode' => ['required'],
            'vir_vbanque' => ['required'],
            'vir_vbranche' => ['required'],
            'vir_vrib' => ['required'],
            'vir_ddate' => ['required'],
            'vir_fmontant' => ['required'],
            'vir_vcodeute' => ['required'],
            'vir_vmotif' => ['required'],
            'vir_vnom' => ['required'],
            'vir_vprenom' => ['required'],
            'vir_vcode_benef' => ['required'],
            'vir_vbanque_benef' => ['required'],
            'vir_vbranche_benef' => ['required'],
            'vir_vrib_benef' => ['required'],
            'vir_vnom_benef' => ['required'],
            'vir_vprenom_benef' => ['required']
        ]);
        return response($virementModel->addVirement($fields));
        // return 'working';
    }
    function getVirementsByCompte($codeCpt){
        $virementModel = new VirementModel();
        return response($virementModel->getVirementsByCompte($codeCpt));
    }

    function addVirementInterne(Request $request) {
        $client = new Client(['verify' => false]); // Use verify false if you are using self-signed certificate
        $response = $client->post('https://192.168.1.120/v1/transactionsnew/'.$request->compte_debit.'/vir/'.$request->compte_credit.'/'.$request->montant.'?api_key=haja', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json'
            ],
            'json' => [
                // "origine" => $request->origine,
                "motif" => $request->motif
            ]
        ]);
        
        $body = $response->getBody();
        $data = json_decode($body);
        return $data;
    }
}
