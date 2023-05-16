<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClientModel;
use App\Models\BeneficiaireModel;

class ClientController extends Controller
{
	public function __invoke(Request $request){}
    
    function getSolde($userId = null){
        $client= new ClientModel();
        return response($client->getSolde($userId));
    }
    function getInfo($userId = null){
        $client= new ClientModel();
        return response ($client->getClientById($userId));
    }
    function getBeneficiaires($userId = null){
        $beneficiaire= new BeneficiaireModel();
        return response ($beneficiaire->getBeneficiaires($userId));
    }

    function getCompteById($userId){
        $client = new ClientModel();
        return response($client->getCompteById($userId));
    }

    function getTransactions($compteId = null){
        $client = new ClientModel();
        return response($client->getTransactions($compteId));
    }
    function getTransactionsWithBalance($compteId = null){
        $client = new ClientModel();
        return response($client->getTransactionsWithBalance($compteId));
    }
    function getDepensesMois($compteId){
        $client = new ClientModel();
        return response($client->getDepensesMois($compteId));
    }
    function getRecettesMois($compteId){
        $client = new ClientModel();
        return response($client->getRecettesMois($compteId));
    }
}
